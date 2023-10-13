import { Test, TestingModule } from '@nestjs/testing';
import { ScriptTypeService } from './script-type.service';

describe('ScriptTypeService', () => {
  let service: ScriptTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScriptTypeService],
    }).compile();

    service = module.get<ScriptTypeService>(ScriptTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
