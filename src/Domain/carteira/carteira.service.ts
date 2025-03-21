import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { PrismaService } from 'src/integrations/prisma/prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class CarteiraService {
  constructor (private readonly usuarioService:  UsuariosService, private prisma: PrismaService) {}
  async createAsync(usuarioId: string) {
    const usuario = await this.usuarioService.findOneAsync(usuarioId);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado ');
    }
    await this.prisma.carteira.create({
      data: {
        usuarioId: usuarioId
      }
    })
    
  }

  async ListarCarteirasUsuario(usuarioId: string) {
    const usuario = await this.usuarioService.findOneAsync(usuarioId);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return await this.prisma.carteira.findMany({
      where: {
        usuarioId: usuarioId
      },
      select:{
        id: true,
        saldo: true
      }
    })
  }

  async encontrarCarteiraPeloId(carteiraId: string) {
    return await this.prisma.carteira.findUnique({
      where: {
        id: carteiraId
      }
    })
  }

  async ListarCarteiraUsuario(usuarioId: string, carteiraId: string) {
    const usuario = await this.usuarioService.findOneAsync(usuarioId);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const carteira = await this.prisma.carteira.findUnique({
      where: {
        id: carteiraId,
        usuarioId: usuarioId
      },
      select:{
        saldo: true
      }
    })
    
    if (!carteira) {
      throw new NotFoundException('Carteira não encontrada');
    }
    return carteira;
  }

  async depositarAsync(usuarioId: string, carteiraId: string, valor: number) {
    const usuario = await this.usuarioService.findOneAsync(usuarioId);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const carteira = await this.ListarCarteiraUsuario(usuarioId, carteiraId)
    if (!carteira) {
      throw new NotFoundException('Carteira não encontrada');
    }

    if (carteira.saldo.lt(new Decimal(0))) {
      throw new NotFoundException('Saldo inválido, consulte o administrador');
    }
    await this.prisma.carteira.update({
      where: {
        id: carteiraId
      },
      data: {
        saldo: {
          increment: valor
        }
      }
    })
  }

}
