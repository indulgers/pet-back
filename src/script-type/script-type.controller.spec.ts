import { Test, TestingModule } from '@nestjs/testing';
import { ScriptTypeController } from './script-type.controller';
import { ScriptTypeService } from './script-type.service';

describe('ScriptTypeController', () => {
  let controller: ScriptTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScriptTypeController],
      providers: [ScriptTypeService],
    }).compile();

    controller = module.get<ScriptTypeController>(ScriptTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
