import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ControllerAdvice } from 'src/controller-advice/controller.advice';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, 
    private readonly controllerAdvice: ControllerAdvice
  ) {}

  @Post()
  @HttpCode(201)
  async createAsync(@Body() createUsuarioDto: CreateUsuarioDto) {
    try{
      return await this.usuariosService.createAsync(createUsuarioDto);

    }catch(e){
      this.controllerAdvice.handle(e);
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAllAsync() {
    return await this.usuariosService.findAllAsync();
  }

  @Get(':email')
  @ApiBearerAuth()
  @HttpCode(404)
  async findOneAsync(@Param('email') email: string) {
    const usuario = await this.usuariosService.findByEmailAsync(email);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      ...usuario,
      senha: undefined,
    };
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @HttpCode(404)
  async updateAsync(@CurrentUser() user: CurrentUserDto, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try{
      await this.usuariosService.update(user.id, updateUsuarioDto);
    }catch(e){
      console.log("erro", e);
      throw e;
    }
  }

  @Delete()
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(404)
  async removeAsync(@CurrentUser() user: CurrentUserDto) {
     await this.usuariosService.remove(user.id);
  }

  @Post('restaurar')
  @HttpCode(201)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(404)
  async restaurarUsuario(@CurrentUser() user: CurrentUserDto) {
    return await this.usuariosService.restore(user.id);
  }
}
