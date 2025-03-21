import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';

@Injectable()
export class AutenticacaoService {
    constructor(private readonly usuarioService: UsuariosService,
        private readonly bcrypt: BcryptCriptografy
    ) {}
    async validateUser(email: string, senha: string) {
         const usuario = await this.usuarioService.findByEmailAsync(email);

         if(!usuario){
            throw new NotFoundException('Email ou senha inválidos');
         }

         const isPasswordValid = await this.bcrypt.compare(senha, usuario.senha);

        if(!isPasswordValid){
            throw new NotFoundException('Email ou senha inválidos');
        }
        return {
            ...usuario,
            senha: undefined
        }

    }
}
