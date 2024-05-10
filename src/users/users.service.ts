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

  async addProtector(User_ID: number, phone: string){
      // Buscar si el teléfono ya existe en la base de datos
      let existingPhone = await this.phoneRepository.findOne({
        where: { Phone: phone },
      });

      if (existingPhone === null || existingPhone === undefined) {
        let p: Phone = new Phone();
        p.Phone = phone;

        existingPhone = await this.phoneRepository.save(p);
      }

      let user = await this.userRepository.findOne({
        where: { User_ID: User_ID },
        relations: ['Protectors'],
      });

      user.Protectors.push(existingPhone);

      this.userRepository.save(user);
      this.phoneRepository.save(existingPhone);

      return 1
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findProtected(phone: string) {
    const users = await this.userRepository.find({
      relations: ['Protectors', 'Phone'],
      where: { Protectors: { Phone: phone } },
    });

    const res = users.map((user) => user.Phone);

    console.log(res);

    return res;
  }

  async findProtectors(id: number) {
    
    const res = await this.userRepository.find({
      relations: ['Protectors'],
      where: { User_ID: id },
    });

    console.log(res);

    return res[0].Protectors;

  }

  async removeProtector(id: number, phoneNumber: string) {

    let user = await this.userRepository.findOne({
      where: { User_ID: id },
      relations: ['Protectors']
    })

    let phone = await this.phoneRepository.findOne({
      where: { Phone: phoneNumber }
    })

    user.Protectors = user.Protectors.filter((p) => p.Phone !== phone.Phone);

    this.userRepository.save(user);

    return 1;
  }

  async login(username: string, password: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { Username: username, Password: password },
      select: ["User_ID"]  
    });
    if (user) {
      console.log(user.User_ID);
      return user.User_ID;
    } else {
      return 0;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
