import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('protector')
  addProtector(phone: string){

    return this.usersService.addProtector(phone);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('protected/:User_ID')
  findProtected(  @Param('User_ID') User_ID: string) {
    return this.usersService.findProtected(+User_ID);
  }

  @Get('protectors/:phone')
  findProtectors(  @Param('phone') phone: string) {
    return this.usersService.findProtectors(phone);
  }

  @Post('login')
  login(@Body() body) {
    console.log(body)
    return this.usersService.login(body.username, body.password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
