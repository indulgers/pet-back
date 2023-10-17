import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script } from '../script/entities/script.entity';
import { User } from '../user/entities/user.entity';
import { Artifact } from './entities/artifact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artifact, Script, User])],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
