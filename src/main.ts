import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 允许跨域

  app.setGlobalPrefix('api/');
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Script-light App')
    .setDescription('api 接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
