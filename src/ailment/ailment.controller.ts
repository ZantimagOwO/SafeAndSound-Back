import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AilmentService } from './ailment.service';
import { CreateAilmentDto } from './dto/create-ailment.dto';
import { UpdateAilmentDto } from './dto/update-ailment.dto';

@Controller('ailment')
export class AilmentController {
  constructor(private readonly ailmentService: AilmentService) {}

  @Post()
  create(@Body() createAilmentDto: CreateAilmentDto) {
    return this.ailmentService.create(createAilmentDto);
  }

  @Get()
  findAll() {
    return this.ailmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ailmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAilmentDto: UpdateAilmentDto) {
    return this.ailmentService.update(+id, updateAilmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ailmentService.remove(+id);
  }
}
