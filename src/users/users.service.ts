import { Phone } from './../phone/entities/phone.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findProtected(id: number) {
    const res = await this.userRepository
      .find({
        relations: ['Phones'],
        where: { User_ID: id },
      })

    console.log(res)

    return res[0].Phones
  }

  async findProtectors(phone: string) {
    const res = await this.phoneRepository.find({
      relations: ['Users'],
      where: { Phone: phone },
    });

    console.log(res)

    return res[0];

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
