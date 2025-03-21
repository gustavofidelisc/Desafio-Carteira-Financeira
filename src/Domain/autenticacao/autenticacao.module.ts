import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { LocalStrategy } from './strategy/local.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';
import { UsuariosService } from '../usuarios/usuarios.service';

@Module({
  imports: [UsuariosModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy, BcryptCriptografy, UsuariosService],
})
export class AutenticacaoModule {}
