import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from '../operation/entities/operation.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Operation])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
