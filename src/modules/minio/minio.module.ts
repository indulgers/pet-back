import { Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';

@Module({
  imports: [],
  controllers: [MinioController],
  providers: [MinioService],
})
export class MinioModule {}
