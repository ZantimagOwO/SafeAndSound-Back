import { Injectable } from '@nestjs/common';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { Button } from './entities/button.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from '../phone/entities/phone.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ButtonService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    @InjectRepository(Button) private buttonRespository: Repository<Button>
  ) {}

  async create(button: Button) {
    let btn = await this.buttonRespository.create(button)
    console.log("Created button: " + btn)
    return 1
  }

  findAll() {
    return `This action returns all button`;
  }

  async findOne(id: number) {
    return await this.buttonRespository.findOne({where: {Button_ID: id}, relations: ['Phones']});
  }

  async findByUser(id: number){
    let buttons = await this.buttonRespository.find({
      where: { User: {User_ID: id} },
      relations: ['Phones', 'User'],
    });
    
    return buttons;
  }

  update(id: number, updateButtonDto: UpdateButtonDto) {
    return `This action updates a #${id} button`;
  }

  remove(id: number) {
    return `This action removes a #${id} button`;
  }
}
