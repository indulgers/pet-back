import { Module } from '@nestjs/common';
import { ScriptTypeService } from './script-type.service';
import { ScriptTypeController } from './script-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptType } from './entities/script-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScriptType])],
  controllers: [ScriptTypeController],
  providers: [ScriptTypeService],
})
export class ScriptTypeModule {}
