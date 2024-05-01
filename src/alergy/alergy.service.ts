import { Injectable } from '@nestjs/common';
import { CreateAlergyDto } from './dto/create-alergy.dto';
import { UpdateAlergyDto } from './dto/update-alergy.dto';

@Injectable()
export class AlergyService {
  create(createAlergyDto: CreateAlergyDto) {
    return 'This action adds a new alergy';
  }

  findAll() {
    return `This action returns all alergy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alergy`;
  }

  update(id: number, updateAlergyDto: UpdateAlergyDto) {
    return `This action updates a #${id} alergy`;
  }

  remove(id: number) {
    return `This action removes a #${id} alergy`;
  }
}
