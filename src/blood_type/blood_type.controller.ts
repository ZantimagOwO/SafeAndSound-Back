import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodTypeService } from './blood_type.service';
import { CreateBloodTypeDto } from './dto/create-blood_type.dto';
import { UpdateBloodTypeDto } from './dto/update-blood_type.dto';

@Controller('blood-type')
export class BloodTypeController {
  constructor(private readonly bloodTypeService: BloodTypeService) {}

  @Post()
  create(@Body() createBloodTypeDto: CreateBloodTypeDto) {
    return this.bloodTypeService.create(createBloodTypeDto);
  }

  @Get()
  findAll() {
    return this.bloodTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodTypeDto: UpdateBloodTypeDto) {
    return this.bloodTypeService.update(+id, updateBloodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodTypeService.remove(+id);
  }
}
