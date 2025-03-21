import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: "gustavo@email.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: "123456Cc@"
    })
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[A-Za-z0-9\W_]{8,}$/, { message: 'Senha deve conter no mínimo 8 caracteres, uma letra, um número e um símbolo' })
    senha: string;
}