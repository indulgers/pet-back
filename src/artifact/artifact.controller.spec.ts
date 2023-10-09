import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactController } from './artifact.controller';
import { ArtifactService } from './artifact.service';

describe('ArtifactController', () => {
  let controller: ArtifactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtifactController],
      providers: [ArtifactService],
    }).compile();

    controller = module.get<ArtifactController>(ArtifactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
