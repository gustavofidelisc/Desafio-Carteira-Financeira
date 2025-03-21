import { Decimal } from "@prisma/client/runtime/library";

export interface CarteiraDevolucaoDto {
    transacoes: {
        id: string;
        valor: Decimal;
        nomeUsuarioDestino: string;
        emailUsuarioDestino: string;
        carteiraDestinoId: string;
        data: Date;
    }[]
}