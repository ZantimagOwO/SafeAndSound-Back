import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlergyService } from './alergy.service';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';

@Controller('alergy')
export class AlergyController {
  constructor(private readonly alergyService: AlergyService) {}

  @Post()
  create(@Body() createAlergyDto: CreateAlergyDto) {
    return this.alergyService.create(createAlergyDto);
  }

  @Get()
  findAll() {
    return this.alergyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alergyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlergyDto: UpdateAlergyDto) {
    return this.alergyService.update(+id, updateAlergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alergyService.remove(+id);
  }
}
