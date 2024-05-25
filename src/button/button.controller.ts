import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ButtonService } from './button.service';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { Button } from './entities/button.entity';

@Controller('button')
export class ButtonController {
  constructor(private readonly buttonService: ButtonService) {}

  @Post()
  create(@Body() body) {
    console.log(body);
    let btn = Button.jsonToButton(body);
    return this.buttonService.create(btn); 
  }

  @Get()
  findAll() {
    return this.buttonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buttonService.findOne(+id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.buttonService.findByUser(+id);
  }

  @Patch()
  update(@Body() body: string) {
    let updateButtonDto = Button.jsonToButton(body);
    return this.buttonService.update(updateButtonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buttonService.remove(+id);
  }
}
