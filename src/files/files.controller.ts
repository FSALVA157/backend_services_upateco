import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('service-image/:imageName')
  findOneServiceImage(
    @Res()
    res: Response,
    @Param('imageName')
    imageName: string,
  ) {
    const path = this.filesService.getStaticServiceImage(imageName);
    res.sendFile(path);
  }

  @Post('service-image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadServiceImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    //const secureUrl = `${file.filename}`;
    return {
      fileName: `${this.configService.get('HOST_API')}/files/service-image/${
        file.filename
      }`,
    };
  }
}
