import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilService } from './profil.service';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';

@Controller('profil')
export class ProfilController {
  constructor(private readonly profilService: ProfilService) {}

  @Post()
  create(@Body() createProfilDto: CreateProfilDto) {
    return this.profilService.create(createProfilDto);
  }

  @Get()
  findAll() {
    return this.profilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilService.update(+id, updateProfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilService.remove(+id);
  }
}
