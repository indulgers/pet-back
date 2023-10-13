import { Module } from '@nestjs/common';
import { WorldViewService } from './world-view.service';
import { WorldViewController } from './world-view.controller';

@Module({
  controllers: [WorldViewController],
  providers: [WorldViewService]
})
export class WorldViewModule {}
