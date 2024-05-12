import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiabetesService } from './diabetes.service';
import { CreateDiabetesDto } from './dto/create-diabetes.dto';
import { UpdateDiabetesDto } from './dto/update-diabetes.dto';

@Controller('diabetes')
export class DiabetesController {
  constructor(private readonly diabetesService: DiabetesService) {}

  @Post()
  create(@Body() createDiabetesDto: CreateDiabetesDto) {
    return this.diabetesService.create(createDiabetesDto);
  }

  @Get()
  findAll() {
    return this.diabetesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diabetesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiabetesDto: UpdateDiabetesDto) {
    return this.diabetesService.update(+id, updateDiabetesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diabetesService.remove(+id);
  }
}
