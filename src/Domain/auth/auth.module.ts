import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/integrations/prisma/prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    })
  ],
  controllers: [AuthController],
  exports: [JwtStrategy],
  providers: [AuthService, PrismaService, UsuariosService, BcryptCriptografy, JwtStrategy],
})
export class AuthModule {}
