import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entities/user.entity';
import { Post } from './modules/post/entities/post.entity';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './modules/pet/pet.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { OperationModule } from './modules/operation/operation.module';
import { Pet } from './modules/pet/entities/pet.entity';
import { PostModule } from './modules/post/post.module';
import { Doctor } from './modules/doctor/entities/doctor.entity';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { MinioModule } from './modules/minio/minio.module';
import { Operation } from './modules/operation/entities/operation.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'magic',
      synchronize: true,
      logging: true,
      entities: [User, Pet, Operation, Doctor, Post],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'light',
      signOptions: {
        expiresIn: '360d',
      },
    }),
    UserModule,
    RedisModule,
    ConfigModule,
    PetModule,
    DoctorModule,
    OperationModule,
    MinioModule,
    PostModule,
    I18nModule.forRoot({
      fallbackLanguage: 'zh',
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
