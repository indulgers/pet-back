import { Injectable } from '@nestjs/common';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@Injectable()
export class ArtifactService {
  create(createArtifactDto: CreateArtifactDto) {
    return 'This action adds a new artifact';
  }

  findAll() {
    return `This action returns all artifact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artifact`;
  }

  update(id: number, updateArtifactDto: UpdateArtifactDto) {
    return `This action updates a #${id} artifact`;
  }

  remove(id: number) {
    return `This action removes a #${id} artifact`;
  }
}
