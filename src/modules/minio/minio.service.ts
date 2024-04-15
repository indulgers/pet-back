// src/minio/minio.service.ts

import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: '172.26.41.84',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    });
  }

  async uploadFile(bucketName: string, objectName: string, data: Buffer) {
    await this.minioClient.putObject(bucketName, objectName, data);
  }
}
