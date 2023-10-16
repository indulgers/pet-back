import { Module } from '@nestjs/common';
import { WorldViewService } from './world-view.service';
import { WorldViewController } from './world-view.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldView } from './entities/world-view.entity';
import { Script } from '../script/entities/script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorldView, Script])],
  controllers: [WorldViewController],
  providers: [WorldViewService],
})
export class WorldViewModule {}
