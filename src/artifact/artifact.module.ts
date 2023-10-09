import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';

@Module({
  controllers: [ArtifactController],
  providers: [ArtifactService]
})
export class ArtifactModule {}
