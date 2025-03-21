import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { PrismaService } from 'src/integrations/prisma/prisma/prisma.service';
import { CarteiraService } from '../carteira/carteira.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Decimal } from '@prisma/client/runtime/library';
import { CarteiraDevolucaoDto } from './dto/carteira-devolucao.dto';

@Injectable()
export class TransacaoService {
  constructor(private prisma: PrismaService,
    private carteiraService: CarteiraService,
    private usuarioService: UsuariosService
  ) {}
  async transferirAsync(usuarioId: string, carteiraIdOrigem: string, carteiraIdDestino: string, valor: number) {
    if (carteiraIdOrigem === carteiraIdDestino) {
      throw new NotFoundException('Carteira de origem e destino não podem ser iguais');
    }
    if (valor <= 0) {
      throw new NotFoundException('Valor inválido');
    }
    const usuario = await this.usuarioService.findOneAsync(usuarioId);
    const carteiraOrigem = await this.carteiraService.ListarCarteiraUsuario(usuarioId, carteiraIdOrigem);
    if (!carteiraOrigem) {
      throw new NotFoundException('Carteira de origem não encontrada');
    }
    const carteiraDestino = await this.carteiraService.encontrarCarteiraPeloId(carteiraIdDestino);
    if (!carteiraDestino) {
      throw new NotFoundException('Carteira de destino não encontrada');
    }
    // convertendo para decimal para evitar problemas de precisão
    if (carteiraOrigem.saldo.lt(new Decimal(valor))) {
      throw new NotFoundException('Saldo insuficiente');
    }
    
    //Transação atômica para garantir a consistência dos dados
    await this.prisma.$transaction([
      this.prisma.carteira.update({
        where: {
          id: carteiraIdOrigem
        },
        data: {
          saldo: {
            decrement: valor
          }
        }
      }),
      this.prisma.carteira.update({
        where: {
          id: carteiraIdDestino
        },
        data: {
          saldo: {
            increment: valor
          }
        }
      }),
      this.prisma.transacao.create({
        data: {
          valor: valor,
          carteiraOrigem: {
            connect: {
              id: carteiraIdOrigem
            }
          },
          carteiraDestino: {
            connect: {
              id: carteiraIdDestino
            }
          }
        }
      })
    ])

    return "Transferência realizada com sucesso";

  }

  async findOneByTransacaoId(transacaoId: string) {
    const transacao = await this.prisma.transacao.findUnique({
      where: {
        id: transacaoId,
        devolucao: false 
      }
    });

    if (!transacao) {
      throw new NotFoundException('Transação não encontrada');
    }
    return transacao;
  }

  async findAll(usuarioId: string) : Promise<CarteiraDevolucaoDto> {
    const carteiras = await this.carteiraService.ListarCarteirasUsuario(usuarioId);
    const carteiraIds = carteiras.map(carteira => carteira.id);
    const transacao=  await this.prisma.transacao.findMany({
      where: {
        devolucao: false,
        carteiraOrigemId: {
          in: carteiraIds
        },
      },
      include:{
        carteiraDestino: {
          include: {
            usuario: {
              select: {
                nome: true,
                email: true
              }
            }
          }
        }
      }
    });

    return {
      transacoes: transacao.map(t => ({
        id: t.id,
        valor: t.valor,
        nomeUsuarioDestino: t.carteiraDestino.usuario.nome,
        emailUsuarioDestino: t.carteiraDestino.usuario.email,
        carteiraDestinoId: t.carteiraDestinoId,
        data: t.data
      }))
    }

    
  }

  async findAllByUserId() {
    return await this.prisma.transacao.findMany({
      where: {
        devolucao: false
      }
    }); 
  }

  async devolucaoTransacao(usuarioId: string, transacaoId: string) {
    //Transação atômica para garantir a consistência dos dados

    const transacao = await this.findOneByTransacaoId(transacaoId);
    const carteiraOrigem = await this.carteiraService.ListarCarteiraUsuario(usuarioId, transacao.carteiraOrigemId);
    if (!carteiraOrigem) {
      throw new NotFoundException('Carteira de origem não encontrada');
    }

    const carteiraDestino = await this.carteiraService.encontrarCarteiraPeloId(transacao.carteiraDestinoId);
    if (!carteiraDestino) {
      throw new NotFoundException('Carteira de destino não encontrada');
    }

    await this.prisma.$transaction([
      this.prisma.carteira.update({
        where: {
          id: transacao.carteiraDestinoId
        },
        data: {
          saldo: {
            decrement: transacao.valor
          }
        }
      }),
      this.prisma.carteira.update({
        where: {
          id: transacao.carteiraOrigemId
        },
        data: {
          saldo: {
            increment: transacao.valor
          }
        }
      }),
      this.prisma.transacao.update({
        where : {
          id: transacaoId
        },
        data: {
          devolucao: true
        }
      })
    ])
  }

}
