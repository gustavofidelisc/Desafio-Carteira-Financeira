import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ControllerAdvice } from 'src/controller-advice/controller.advice';
import { PrismaModule } from 'src/integrations/prisma/prisma.module';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, ControllerAdvice, BcryptCriptografy],
})
export class UsuariosModule {}
