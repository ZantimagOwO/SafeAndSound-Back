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

  async addProtector(phone: string){

    let existe = this.phoneRepository.findOne({ Phone: phone });

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
        relations: ['Protected'],
        where: { User_ID: id },
      })

    console.log(res)

    return res[0].Protected
  }

  async findProtectors(phone: string) {
    const users = await this.userRepository.find({
      relations: ['Protected', 'Phone'],
      where: { Protected: { Phone: phone } },
    });

    const res = users.map((user) => user.Phone);

    console.log(res)

    return res;

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
