import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { guid } from 'src/common/utils/utils';
import { ResultData } from 'src/common/utils/result';
import { Operation } from '../operation/entities/operation.entity';
@Injectable()
export class DoctorService {
  @InjectRepository(Doctor)
  private readonly doctorRepository: Repository<Doctor>;
  @InjectRepository(Operation)
  private readonly operationRepository: Repository<Operation>;

  async create(createDoctorDto: CreateDoctorDto): Promise<ResultData<Doctor>> {
    const [newDoctor, newOperation] = await Promise.all([
      this.doctorRepository.create({
        id: guid(),
        ...createDoctorDto,
      }),
      this.operationRepository.create({
        id: guid(),
        mode: 'create',
        model: 'doctor',
        user_id: createDoctorDto.user_id,
      }),
    ]);
    await this.operationRepository.save(newOperation);
    return ResultData.ok(await this.doctorRepository.save(newDoctor));
  }

  async findAll(): Promise<ResultData<Doctor[]>> {
    return ResultData.ok(await this.doctorRepository.find());
  }

  async findOne(id: number): Promise<ResultData<Doctor>> {
    const doctor = await this.doctorRepository.findOne({
      where: { id: String(id) },
    });
    if (!doctor) {
      return ResultData.fail(404, 'doctor not found');
    }
    return ResultData.ok(doctor);
  }

  async update(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ): Promise<ResultData<Doctor>> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      return ResultData.fail(404, 'Doctor not found');
    }
    const [updatedDoctor, operation] = await Promise.all([
      this.doctorRepository.save({ ...doctor, ...updateDoctorDto }),
      this.operationRepository.create({
        id: guid(),
        mode: 'update',
        model: 'doctor',
        user_id: updateDoctorDto.user_id,
      }),
    ]);
    this.operationRepository.save(operation);
    return ResultData.ok(updatedDoctor);
  }

  async remove(userId: string, id: string): Promise<ResultData<void>> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      return ResultData.fail(404, 'Doctor not found');
    }

    const [deletedDoctor, operation] = await Promise.all([
      this.doctorRepository.remove(doctor),
      this.operationRepository.create({
        id: guid(),
        mode: 'delete',
        model: 'doctor',
        user_id: userId,
      }),
    ]);
    this.operationRepository.save(operation);
    return ResultData.ok();
  }
}
