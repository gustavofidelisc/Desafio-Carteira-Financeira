import { Module } from '@nestjs/common';
import { UsuariosModule } from './Domain/usuarios/usuarios.module';
import { PrismaService } from './integrations/prisma/prisma/prisma.service';
import { CarteiraModule } from './Domain/carteira/carteira.module';
import { TransacaoModule } from './Domain/transacao/transacao.module';
import { PrismaModule } from './integrations/prisma/prisma.module';
import { AutenticacaoModule } from './Domain/autenticacao/autenticacao.module';

@Module({
  imports: [UsuariosModule, CarteiraModule, TransacaoModule, PrismaModule, AutenticacaoModule],
  controllers: [],
  providers: [AppModule],
})
export class AppModule {}
