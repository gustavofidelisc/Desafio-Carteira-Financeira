import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Gustavo',
    })
    @IsString()
    @MinLength(3, { message: 'Nome deve conter no mínimo 3 caracteres' })
    @MaxLength(100, { message: 'Nome deve conter no máximo 100 caracteres' })
    nome: string;
    
    @ApiProperty({
        description: 'Email do usuário',
        example: 'gustavo@email.com'
    })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456'
    })
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9\W_]{8,}$/, { message: 'Senha deve conter no mínimo 8 caracteres, uma letra, um número e um símbolo' })
    senha: string;
}
