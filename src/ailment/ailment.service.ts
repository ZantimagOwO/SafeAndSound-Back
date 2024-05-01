import { Injectable } from '@nestjs/common';
import { CreateAilmentDto } from './dto/create-ailment.dto';
import { UpdateAilmentDto } from './dto/update-ailment.dto';

@Injectable()
export class AilmentService {
  create(createAilmentDto: CreateAilmentDto) {
    return 'This action adds a new ailment';
  }

  findAll() {
    return `This action returns all ailment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ailment`;
  }

  update(id: number, updateAilmentDto: UpdateAilmentDto) {
    return `This action updates a #${id} ailment`;
  }

  remove(id: number) {
    return `This action removes a #${id} ailment`;
  }
}
