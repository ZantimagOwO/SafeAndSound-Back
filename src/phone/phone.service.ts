import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
  ) {}

  create(createPhoneDto: CreatePhoneDto) {
    return 'This action adds a new phone';
  }

  findAll() {
    return `This action returns all phone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phone`;
  }

  update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return `This action updates a #${id} phone`;
  }

  remove(id: number) {
    return `This action removes a #${id} phone`;
  }
}
