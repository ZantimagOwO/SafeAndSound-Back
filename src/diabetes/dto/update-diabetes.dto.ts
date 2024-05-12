import { PartialType } from '@nestjs/mapped-types';
import { CreateDiabetesDto } from './create-diabetes.dto';

export class UpdateDiabetesDto extends PartialType(CreateDiabetesDto) {}
