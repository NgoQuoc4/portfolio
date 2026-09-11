import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService, UploadedMulterFile } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: UploadedMulterFile) {
    if (!file) {
      throw new BadRequestException('Please provide a file to upload');
    }
    return this.uploadService.uploadImage(file);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: UploadedMulterFile) {
    if (!file) {
      throw new BadRequestException('Please provide an image to upload');
    }
    return this.uploadService.uploadImage(file);
  }
}
