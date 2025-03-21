import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';

@Controller('carteira')
export class CarteiraController {
  
  constructor(private readonly carteiraService: CarteiraService) {}

  @Post()
  @HttpCode(201)
  @HttpCode(404)
  async createAsync(@Query('usuarioId') usuarioId: string) {
    return await this.carteiraService.createAsync(usuarioId);
  }

  @Post('depositar')
  @HttpCode(201)
  @HttpCode(404)
  async depositarAsync(@Query('usuarioId') usuarioId: string, @Query('carteiraId') carteiraId: string, @Query('valor') valor: number) {
    return await this.carteiraService.depositarAsync(usuarioId, carteiraId, valor);
  }




  @Get('usuario/:usuarioId')
  findAll(@Param('usuarioId') usuarioId: string) {
    return this.carteiraService.ListarCarteirasUsuario(usuarioId);
  }

  @Get(':carteiraId/:usuarioId')
  findOne(@Param('carteiraId') carteiraId: string, @Param('usuarioId') usuarioId: string) {
    return this.carteiraService.ListarCarteiraUsuario(usuarioId, carteiraId);
  }

}
