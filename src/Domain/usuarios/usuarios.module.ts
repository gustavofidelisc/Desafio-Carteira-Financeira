import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ControllerAdvice } from 'src/controller-advice/controller.advice';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, ControllerAdvice],
})
export class UsuariosModule {}
