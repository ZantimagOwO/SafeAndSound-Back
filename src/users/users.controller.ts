import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userData) {
    console.log(userData);
    let user = User.jsonToUser(userData)
    return this.usersService.create(user);
  }

  @Post('/addProtector/:id/:phone')
  addProtector(@Param('id') id: string, @Param('phone') phone: string){

    console.log(id)
    console.log(phone)

    return this.usersService.addProtector(+id, phone);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('protected/:phone')
  findProtected(  @Param('phone') phone: string) {
    console.log(phone)
    return this.usersService.findProtected(phone);
  }

  @Get(':id/protectors')
  findProtectors(  @Param('id') id: string) {
    console.log(id)
    return this.usersService.findProtectors(+id);
  }

  @Post('login')
  login(@Body() body) {
    console.log(body)
    return this.usersService.login(body.username, body.password);
  }

  @Post('sendProtectorRequest/:id/:phone')
  sendProtectorRequest(@Param('id') id: string, @Param('phone') phone: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('removeProtector/:id/:phone')
  removeProtector(@Param('id') id: string, @Param('phone') phone: string) {
    return this.usersService.removeProtector(+id, phone)
  }
}
