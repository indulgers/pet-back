import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script } from '../script/entities/script.entity';
import { User } from '../user/entities/user.entity';
import { Artifact } from './entities/artifact.entity';
import { Project } from '../project/entities/project.entity';
import { Chapter } from '../chapter/entities/chapter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artifact, Script, User, Project, Chapter]),
  ],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
