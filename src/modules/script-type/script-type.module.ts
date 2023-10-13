import { Module } from '@nestjs/common';
import { ScriptTypeService } from './script-type.service';
import { ScriptTypeController } from './script-type.controller';

@Module({
  controllers: [ScriptTypeController],
  providers: [ScriptTypeService]
})
export class ScriptTypeModule {}
