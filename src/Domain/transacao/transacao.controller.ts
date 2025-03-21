import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post('transferir')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @HttpCode(404)
  async transferirAsync(@CurrentUser() user: CurrentUserDto, @Query('carteiraIdOrigem') carteiraIdOrigem: string, @Query('carteiraIdDestino') carteiraIdDestino: string, @Query('valor') valor: number) {
    return await this.transacaoService.transferirAsync(user.id, carteiraIdOrigem, carteiraIdDestino, valor);
  }

  @Post('devolver')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @HttpCode(404)
  async devolverAsync(@CurrentUser() user: CurrentUserDto, @Query('transacaoId') transacaoId: string) {
    return await this.transacaoService.devolucaoTransacao(user.id, transacaoId);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@CurrentUser() user: CurrentUserDto) {
    return this.transacaoService.findAll(user.id);
  }
}
