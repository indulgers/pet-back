import { Test, TestingModule } from '@nestjs/testing';
import { WorldViewController } from './world-view.controller';
import { WorldViewService } from './world-view.service';

describe('WorldViewController', () => {
  let controller: WorldViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldViewController],
      providers: [WorldViewService],
    }).compile();

    controller = module.get<WorldViewController>(WorldViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
