import { Module } from '@nestjs/common';
import { UsuariosModule } from './Domain/usuarios/usuarios.module';
import { PrismaService } from './integrations/prisma/prisma/prisma.service';
import { CarteiraModule } from './Domain/carteira/carteira.module';
import { TransacaoModule } from './Domain/transacao/transacao.module';
import { PrismaModule } from './integrations/prisma/prisma.module';
import { AuthModule } from './Domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [UsuariosModule, CarteiraModule, TransacaoModule, PrismaModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [AppModule],
})
export class AppModule {}
