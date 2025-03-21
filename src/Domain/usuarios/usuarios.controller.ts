import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ControllerAdvice } from 'src/controller-advice/controller.advice';

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
  async findAllAsync() {
    return await this.usuariosService.findAllAsync();
  }

  @Get(':id')
  @HttpCode(404)
  async findOneAsync(@Param('id') id: string) {
    const usuario = await this.usuariosService.findOneAsync(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  @Patch(':id')
  @HttpCode(204)
  @HttpCode(404)
  async updateAsync(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    try{
      await this.usuariosService.update(id, updateUsuarioDto);
    }catch(e){
      console.log("erro", e);
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @HttpCode(404)
  async removeAsync(@Param('id') id: string) {
    const usuario = await this.usuariosService.remove(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  @Post('restaura/:email')
  @HttpCode(201)
  @HttpCode(404)
  async restaurarUsuario(@Param('email') email: string) {
    return await this.usuariosService.restore(email);
  }
}
