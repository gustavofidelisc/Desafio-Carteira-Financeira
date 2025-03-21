import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseGuards } from '@nestjs/common';
import { CarteiraService } from './carteira.service';
import { CreateCarteiraDto } from './dto/create-carteira.dto';
import { UpdateCarteiraDto } from './dto/update-carteira.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('carteira')
export class CarteiraController {
  
  constructor(private readonly carteiraService: CarteiraService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @HttpCode(404)
  async createAsync(@CurrentUser() user: CurrentUserDto) {
    return await this.carteiraService.createAsync(user.id);
  }

  @Post('depositar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @HttpCode(404)
  async depositarAsync(@CurrentUser() user: CurrentUserDto, @Query('carteiraId') carteiraId: string, @Query('valor') valor: number) {
    return await this.carteiraService.depositarAsync(user.id, carteiraId, valor);
  }

  @Get('usuario')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@CurrentUser() user: CurrentUserDto) {
    return this.carteiraService.ListarCarteirasUsuario(user.id);
  }

  @Get(':carteiraId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('carteiraId') carteiraId: string,@CurrentUser() user: CurrentUserDto) {
    return this.carteiraService.ListarCarteiraUsuario(user.id, carteiraId);
  }

}
