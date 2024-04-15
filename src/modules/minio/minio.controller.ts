// src/minio/minio.controller.ts

import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MinioService } from '../minio/minio.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    await this.minioService.uploadFile(
      'images',
      file.originalname,
      file.buffer,
    );
    return 'File uploaded successfully';
  }
}
