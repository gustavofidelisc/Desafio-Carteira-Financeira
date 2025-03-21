import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateTransacaoDto {
    @IsNumberString()
    valor: string;

    @IsString()
    carteiraOrigemId: string;

    @IsString()
    carteiraDestinoId: string;
}
