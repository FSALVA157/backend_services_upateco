import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RechazoService } from './rechazo.service';
import { CreateRechazoDto } from './dto/create-rechazo.dto';
import { UpdateRechazoDto } from './dto/update-rechazo.dto';

@Controller('rechazo')
export class RechazoController {
  constructor(private readonly rechazoService: RechazoService) {}

  @Post()
  create(@Body() createRechazoDto: CreateRechazoDto) {
    return this.rechazoService.create(createRechazoDto);
  }

  @Get()
  findAll() {
    return this.rechazoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rechazoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRechazoDto: UpdateRechazoDto) {
    return this.rechazoService.update(+id, updateRechazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechazoService.remove(+id);
  }
}
