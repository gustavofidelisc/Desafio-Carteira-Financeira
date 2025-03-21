import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {
    validateUser(email: string, senha: string) {
        throw new Error("Method not implemented.");
    }
}
