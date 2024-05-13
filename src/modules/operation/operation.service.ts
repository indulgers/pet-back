import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from './entities/operation.entity';
import { ResultData } from 'src/common/utils/result';
@Injectable()
export class OperationService {
  @InjectRepository(Operation)
  private readonly operationRepository: Repository<Operation>;

  async create(
    createOperationDto: CreateOperationDto,
  ): Promise<ResultData<Operation>> {
    const newOperation = this.operationRepository.create(createOperationDto);
    newOperation.date = new Date();
    await this.operationRepository.save(newOperation);
    return ResultData.ok(newOperation);
  }

  async findAll(): Promise<ResultData<Operation[]>> {
    const operations = await this.operationRepository.find({
      order: { date: 'DESC' }, // 按照 date 字段降序排序
  });
    console.log(operations);
    return ResultData.ok(operations);
  }

  findOne(id: number) {
    return `This action returns a #${id} operation`;
  }

  update(id: number, updateOperationDto: UpdateOperationDto) {
    return `This action updates a #${id} operation`;
  }

  remove(id: number) {
    return `This action removes a #${id} operation`;
  }
}
