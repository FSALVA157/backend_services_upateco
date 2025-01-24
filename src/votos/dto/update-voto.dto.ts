import { PartialType } from '@nestjs/swagger';
import { CreateVotoDto } from './create-voto.dto';

export class UpdateVotoDto extends PartialType(CreateVotoDto) {}
