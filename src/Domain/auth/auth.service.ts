import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptCriptografy } from 'src/integrations/bcrypt/bcrypt.criptografy';
import { PrismaService } from 'src/integrations/prisma/prisma/prisma.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly bcrypt: BcryptCriptografy,
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ) {}

    // Método de autenticação de usuário
    async login(authDto: AuthDto): Promise<any> {
        // Busca usuário pelo email
        const usuario = await this.usuariosService.findByEmailAsync(authDto.email);

        // Verifica se usuário foi encontrado
        if (!usuario) {
            throw new UnauthorizedException('Email ou senha inválidos'); 
        }

        const isPasswordValid = await this.bcrypt.compare(authDto.senha, usuario.senha);
        if  (!isPasswordValid) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }
        // Retorna usuário autenticado
        const payload = { email: usuario.email, sub: usuario.id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
