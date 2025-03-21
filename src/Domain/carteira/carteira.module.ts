import { Module } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CarteiraController } from './carteira.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';

@Module({
  controllers: [CarteiraController],
  providers: [CarteiraService, UsuariosService],
})
export class CarteiraModule {}
