import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { guid } from 'src/common/utils/utils';
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class PetService {
  @InjectRepository(Pet)
  private readonly petRepository: Repository<Pet>;

  async create(createPetDto: CreatePetDto): Promise<ResultData<Pet>> {
    const newPet = this.petRepository.create({
      id: guid(),
      ...createPetDto,
    });
    await this.petRepository.save(newPet);
    return ResultData.ok(newPet, '创建成功');
  }

  async findAll(): Promise<ResultData<Pet[]>> {
    const pets = await this.petRepository.find();
    return ResultData.ok(pets);
  }

  findOne(id: number) {
    const pet = this.petRepository.findOne({ where: { id: String(id) } });
    if (!pet) {
      return ResultData.fail(404, 'pet not found');
    }
    return ResultData.ok(pet);
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    if (!this.petRepository.findOne({ where: { id: String(id) } })) {
      return ResultData.fail(404, 'pet not found');
    }
    this.petRepository.update(id, updatePetDto);
    return ResultData.ok();
  }

  remove(id: number) {
    if (!this.petRepository.findOne({ where: { id: String(id) } })) {
      return ResultData.fail(404, 'pet not found');
    }
    this.petRepository.delete(id);
    return ResultData.ok();
  }
}
