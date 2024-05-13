import { Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';

import { MinioModule as MinioClientModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MinioClientModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: '127.0.0.1',
          port: 9000,
          useSSL: false,
          accessKey: 'minioadmin',
          secretKey: 'minioadmin',
        };
      },
    }),
  ],
  providers: [MinioService],
  controllers: [MinioController],
  exports: [MinioService],
})
export class MinioModule {}
