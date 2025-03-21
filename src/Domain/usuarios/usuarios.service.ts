import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../integrations/prisma/prisma/prisma.service';
import { DomainException } from '../exceptions/domain.exception';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}
  async createAsync(createUsuarioDto: CreateUsuarioDto) {
    const date = new Date();

    let usuarioBanco = await this.findOneByEmailAsync(createUsuarioDto.email);
    if(usuarioBanco){
      throw new DomainException('Usuário já cadastrado');
    } 
    const usuario = await this.prisma.usuario.create({
      data: {
        ...createUsuarioDto,
        carteira: {
          create: undefined
        }
      }
    })
    const user = undefined;
    this.prisma.$disconnect();
    if(!usuario){
      throw new DomainException('Erro ao criar usuário');
    }

    return  usuario.id
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

  async findOneByEmailAsync(email: string, ativo: boolean = true) {
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
    const user = await this.findOneByEmailAsync(email, false);
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
