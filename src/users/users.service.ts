import { Ailment } from './../ailment/entities/ailment.entity';
import { Phone } from './../phone/entities/phone.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Alergy } from '../alergy/entities/alergy.entity';
import { BloodType } from '../blood_type/entities/blood_type.entity';
import { Diabetes } from '../diabetes/entities/diabetes.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    @InjectRepository(BloodType)
    private bloodTypeRepository: Repository<BloodType>,
    @InjectRepository(Diabetes)
    private diabetesRepository: Repository<Diabetes>,
  ) {}

  async create(user: User) {
    let phone = await this.phoneRepository.findOneBy({
      Phone: user.Phone.Phone,
    });
    if (phone !== null) {
      return 'Telefono ya registrado';
    }

    phone = new Phone();
    phone.Phone = user.Phone.Phone;
    await this.phoneRepository.save(phone);
    user.Phone = phone;

    let bType = await this.bloodTypeRepository.findOneBy({
      Blood_Group: user.Blood_Type.Blood_Group,
      RH: user.Blood_Type.RH,
    });
    user.Blood_Type = bType;

    let diabetes = await this.diabetesRepository.findOneBy({Diabetes_ID: user.Diabetes.Diabetes_ID})
    user.Diabetes = diabetes
    console.log('creando usuario: ' + JSON.stringify(user),);

    await this.userRepository.save(user);
    console.log('usuario registrado correctamente');
    return 'usuario registrado correctamente';
  }

  async addProtector(User_ID: number, phone: string) {
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

    return 1;
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
      relations: ['Protectors'],
    });

    let phone = await this.phoneRepository.findOne({
      where: { Phone: phoneNumber },
    });

    user.Protectors = user.Protectors.filter((p) => p.Phone !== phone.Phone);

    this.userRepository.save(user);

    return 1;
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Username: username, Password: password },
      relations: ['Phone', 'Ailments', 'Alergies', 'Blood_Type'],
    });
    if (user) {
      console.log(user);
      return user;
    } else {
      return null;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
