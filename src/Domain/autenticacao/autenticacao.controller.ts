import { Controller } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}
}
