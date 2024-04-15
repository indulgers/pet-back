import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { Artifact } from './entities/artifact.entity';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../shared/crud.controller';
@ApiTags('Artifact')
@Controller('artifact')
export class ArtifactController extends CrudController<Artifact> {
  constructor(private readonly artifactService: ArtifactService) {
    super(artifactService);
  }

  @Post('/create')
  createArtifact(@Body() createArtifactDto: CreateArtifactDto) {
    return this.artifactService.create(createArtifactDto);
  }
}
