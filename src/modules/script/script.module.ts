import { Module } from '@nestjs/common';
import { ScriptService } from './script.service';
import { ScriptController } from './script.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script } from './entities/script.entity';
import { User } from '../user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Script, User])],
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
