import { Injectable } from '@nestjs/common';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class ArtifactService extends CrudService<Artifact> {
  constructor(@InjectRepository(Artifact) repo) {
    super(repo);
  }
}
