// src/minio/minio.service.ts

import * as Minio from 'minio';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MinioService as MinioClientService } from 'nestjs-minio-client';
import { BucketItem, BucketStream } from 'minio';
import { Readable } from 'stream';
import { AppHttpCode, ResultData } from '../../common';
@Injectable()
export class MinioService {
  private readonly baseBucket = 'images';
  private readonly client = this.minioService.client;
  constructor(private readonly minioService: MinioClientService) {}
  async upload(file: any, baseBucket: string = this.baseBucket){
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const temp_fileName = file.originalname;
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_fileName)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const filename = hashedFileName + ext;
    const fileName = `${filename}`;
    const fileBuffer = file.buffer;

    try {
      // 生成预签名 URL
      const urlPromise = this.client.presignedUrl(
        'PUT',
        baseBucket,
        fileName,
        60 * 60 * 24 * 7, // 设置有效期为一周
      );

      // 使用预签名 URL 上传文件
      await this.client.putObject(baseBucket, fileName, fileBuffer);
      const url = await urlPromise;

      const data = {
        url,
        fileName,
        originalname: file.originalname,
        ext,
        mimetype: file.mimetype,
        size: file.size,
      }
      // 上传成功回传文件信息
      return {
        code: 200,
        message:'success',
        data:{
          data
        }
      }
    } catch (err) {
      // 将 MinIO 返回的错误信息传递给 HttpException
      const errorMessage = `Error uploading file: ${err.message}`;
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  // async listAllFilesByBucket(): Promise<any> {
  //   const tmpByBucket: BucketStream<BucketItem> =
  //     await this.client.listObjectsV2(this.baseBucket, '', true);

  //   const filesWithUrls = [];

  //   for await (const file of tmpByBucket) {
  //     const url = await this.client.presignedGetObject(
  //       this.baseBucket,
  //       file.name,
  //       60 * 60, // 设置有效期为一小时，根据需求调整
  //     );

  //     filesWithUrls.push({
  //       ...file,
  //       url,
  //     });
  //   }
  //   const readableStream = Readable.from(filesWithUrls);

  //   return ResultData.ok(await this.readData(readableStream));
  // }

  // async deleteFile(objetName: string, baseBucket: string = this.baseBucket) {
  //   const tmp: any = await this.listAllFilesByBucket();
  //   const names = tmp?.map((i) => i.name);
  //   if (!names.includes(objetName)) {
  //     throw new HttpException(
  //       '删除失败，文件不存在',
  //       HttpStatus.SERVICE_UNAVAILABLE,
  //     );
  //   }
  //   return this.client.removeObject(baseBucket, objetName, async (err) => {
  //     if (err) {
  //       throw new HttpException('删除失败，请重试', HttpStatus.BAD_REQUEST);
  //     }
  //   });
  // }

  async download(fileName) {
    return await this.client.getObject(this.baseBucket, fileName);
  }

  readData = async (stream: Readable) =>
    new Promise((resolve, reject) => {
      const a = [];
      stream
        .on('data', function (row) {
          a.push(row);
        })
        .on('end', function () {
          resolve(a);
        })
        .on('error', function (error) {
          reject(error);
        });
    });
}
