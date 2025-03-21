import { Module } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CarteiraController } from './carteira.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';

@Module({
  controllers: [CarteiraController],
  providers: [CarteiraService, UsuariosService, BcryptCriptografy],
})
export class CarteiraModule {}
