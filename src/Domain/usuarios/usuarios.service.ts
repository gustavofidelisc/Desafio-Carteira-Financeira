import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../integrations/prisma/prisma/prisma.service';
import { DomainException } from '../exceptions/domain.exception';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';
@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptCriptografy
  ) {}
  async createAsync(createUsuarioDto: CreateUsuarioDto) {
    const usuario =  {
      ...createUsuarioDto,
      senha: await this.bcrypt.hash(createUsuarioDto.senha),
    }
    const date = new Date();

    let usuarioBanco = await this.findByEmailAsync(createUsuarioDto.email);
    if(usuarioBanco){
      throw new DomainException('Usuário já cadastrado');
    } 
    const usuarioCriado = await this.prisma.usuario.create({
      data: {
        ...usuario,
        carteira:{
          create:{}
        },
      }
    })
    const user = undefined;
    this.prisma.$disconnect();
    if(!usuarioCriado){
      throw new DomainException('Erro ao criar usuário');
    }

    return  usuarioCriado.id
  }

  async findAllAsync() {
    return await this.prisma.usuario.findMany({
      where:{
        ativo: true
      },
      select:{
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        atualizadoEm: true
      }

    });
  }

  async findOneAsync(id: string, ativo: boolean = true) {
    return await this.prisma.usuario.findUnique({
      where: {
        id,
        ativo
      },
      select:{
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        atualizadoEm: true,     
        carteira:{
          select:{
            id: true,
            saldo: true
          }
        }   
      }
    });
  }

  async findByEmailAsync(email: string, ativo: boolean = true) {
    return await this.prisma.usuario.findUnique({
      where: {
        email
      }
    });
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOneAsync(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado para atualização');
    }
    await this.prisma.usuario.update({
      where: {
        id
      },
      data: {
        ...updateUsuarioDto
      }
    });
    this.prisma.$disconnect();
  }

  async remove(id: string) {
    const user = await this.findOneAsync(id);
    if (!user) {
      return new NotFoundException('Usuário não encontrado');
    }
    await this.prisma.usuario.update({
      where: {
        id
      },
      data: {
        ativo: false
      }
    });
    this.prisma.$disconnect();
  }



  async restore(email: string) {
    const user = await this.findByEmailAsync(email, false);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.prisma.usuario.update({
      where: {
        email
      },
      data: {
        ativo: true
      }
    });
    this.prisma.$disconnect();
  }
}
