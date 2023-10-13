import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { ArtifactModule } from './modules/artifact/artifact.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { ProjectModule } from './modules/project/project.module';
import { ScriptModule } from './modules/script/script.module';
import { RoleRolaModule } from './modules/role-rola/role-rola.module';
import { RoleViewsModule } from './modules/role-views/role-views.module';
import { WorldViewModule } from './modules/world-view/world-view.module';
import { Project } from './modules/project/entities/project.entity';
import { Artifact } from './modules/artifact/entities/artifact.entity';
import { Chapter } from './modules/chapter/entities/chapter.entity';
import { Script } from './modules/script/entities/script.entity';
import { WorldView } from './modules/world-view/entities/world-view.entity';
import { RolesViews } from './modules/role-views/entities/role-view.entity';
import { RolesLora } from './modules/role-rola/entities/role-rola.entity';
import { ScriptTypeModule } from './modules/script-type/script-type.module';
import { ProjectTypeModule } from './modules/project-type/project-type.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'script_light',
      synchronize: true,
      logging: true,
      entities: [
        User,
        Artifact,
        Chapter,
        Project,
        Script,
        WorldView,
        RolesViews,
        RolesLora,
      ],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'light',
      signOptions: {
        expiresIn: '360d',
      },
    }),
    UserModule,
    RedisModule,
    ConfigModule,
    ArtifactModule,
    ChapterModule,
    ProjectModule,
    ScriptModule,
    WorldViewModule,
    RoleViewsModule,
    RoleRolaModule,
    ScriptTypeModule,
    ProjectTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
