import { Injectable } from '@nestjs/common';
import { CreateDiabetesDto } from './dto/create-diabetes.dto';
import { UpdateDiabetesDto } from './dto/update-diabetes.dto';

@Injectable()
export class DiabetesService {
  create(createDiabetesDto: CreateDiabetesDto) {
    return 'This action adds a new diabetes';
  }

  findAll() {
    return `This action returns all diabetes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diabetes`;
  }

  update(id: number, updateDiabetesDto: UpdateDiabetesDto) {
    return `This action updates a #${id} diabetes`;
  }

  remove(id: number) {
    return `This action removes a #${id} diabetes`;
  }
}
