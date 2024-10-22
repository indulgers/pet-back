import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Operation } from '../operation/entities/operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Operation])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
