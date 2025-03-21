import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post('transferir')
  @HttpCode(201)
  @HttpCode(404)
  async transferirAsync(@Query('usuarioId') usuarioId: string, @Query('carteiraIdOrigem') carteiraIdOrigem: string, @Query('carteiraIdDestino') carteiraIdDestino: string, @Query('valor') valor: number) {
    return await this.transacaoService.transferirAsync(usuarioId, carteiraIdOrigem, carteiraIdDestino, valor);
  }

  @Post('devolver')
  @HttpCode(201)
  @HttpCode(404)
  async devolverAsync(@Query('usuarioId') usuarioId: string, @Query('transacaoId') transacaoId: string) {
    return await this.transacaoService.devolucaoTransacao(usuarioId, transacaoId);
  }


  @Get()
  findAll() {
    return this.transacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransacaoDto: UpdateTransacaoDto) {
    return this.transacaoService.update(+id, updateTransacaoDto);
  }

}
