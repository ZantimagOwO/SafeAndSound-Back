import { PartialType } from '@nestjs/mapped-types';
import { CreateAilmentDto } from './create-ailment.dto';

export class UpdateAilmentDto extends PartialType(CreateAilmentDto) {}
