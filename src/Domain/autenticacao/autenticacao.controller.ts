import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  @HttpCode(201)
  @UseGuards(LocalAuthGuard)
  async login() {
    // return this.autenticacaoService.login();
  }

}
