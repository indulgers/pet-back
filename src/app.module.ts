import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { ArtifactModule } from './artifact/artifact.module';
import { ChapterModule } from './chapter/chapter.module';
import { ProjectModule } from './project/project.module';
import { ScriptModule } from './script/script.module';
import { RoleRolaModule } from './role-rola/role-rola.module';
import { RoleViewsModule } from './role-views/role-views.module';
import { WorldViewModule } from './world-view/world-view.module';
import { Project } from './project/entities/project.entity';
import { Artifact } from './artifact/entities/artifact.entity';
import { Chapter } from './chapter/entities/chapter.entity';
import { Script } from './script/entities/script.entity';
import { WorldView } from './world-view/entities/world-view.entity';
import { RolesViews } from './role-views/entities/role-view.entity';
import { RolesLora } from './role-rola/entities/role-rola.entity';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
