import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AutenticacaoService } from "../autenticacao.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly autenticacaoService: AutenticacaoService) {
        super({usernameField: 'email'});
    }

    async validate(email: string, senha: string) {
        return this.autenticacaoService.validateUser(email, senha);
    }
}