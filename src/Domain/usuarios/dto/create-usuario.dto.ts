import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Gustavo',
    })
    @IsString()
    nome: string;
    
    @ApiProperty({
        description: 'Email do usuário',
        example: 'gustavo@email.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    @IsString()
    senha: string;
}
