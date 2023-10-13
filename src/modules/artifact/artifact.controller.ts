import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@Controller('artifact')
export class ArtifactController {
  constructor(private readonly artifactService: ArtifactService) {}

  @Post()
  create(@Body() createArtifactDto: CreateArtifactDto) {
    return this.artifactService.create(createArtifactDto);
  }

  @Get()
  findAll() {
    return this.artifactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artifactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtifactDto: UpdateArtifactDto) {
    return this.artifactService.update(+id, updateArtifactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artifactService.remove(+id);
  }
}
