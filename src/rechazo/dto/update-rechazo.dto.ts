import { PartialType } from '@nestjs/swagger';
import { CreateRechazoDto } from './create-rechazo.dto';

export class UpdateRechazoDto extends PartialType(CreateRechazoDto) {}
