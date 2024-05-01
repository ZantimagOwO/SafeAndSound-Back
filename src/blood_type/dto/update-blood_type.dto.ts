import { PartialType } from '@nestjs/mapped-types';
import { CreateBloodTypeDto } from './create-blood_type.dto';

export class UpdateBloodTypeDto extends PartialType(CreateBloodTypeDto) {}
