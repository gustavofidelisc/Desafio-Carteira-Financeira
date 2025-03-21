import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { PrismaService } from 'src/integrations/prisma/prisma/prisma.service';
import { CarteiraService } from '../carteira/carteira.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { TransacaoController } from './transacao.controller';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService, CarteiraService, UsuariosService, PrismaService],
})
export class TransacaoModule {}
