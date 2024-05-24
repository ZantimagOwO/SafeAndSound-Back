import { Phone } from './../phone/entities/phone.entity';
import { Injectable } from '@nestjs/common';
import { CreateButtonDto } from './dto/create-button.dto';
import { UpdateButtonDto } from './dto/update-button.dto';
import { Button } from './entities/button.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
    console.log("Created button: " + JSON.stringify(button))
    await this.buttonRespository.save(button)
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
      relations: ['User', 'Phones'],
    });

    buttons.map((b) => {
      b.User = null;
    })
    
    return buttons;
  }

  update(id: number, updateButtonDto: UpdateButtonDto) {
    return `This action updates a #${id} button`;
  }

  remove(id: number) {
    this.buttonRespository.delete({Button_ID: id})
    return `Boton borrado existosamente`;
  }
}
