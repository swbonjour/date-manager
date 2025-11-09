import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from './config/conf-env';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configAPI = new DocumentBuilder()
    .setTitle('Schedly API')
    .setDescription('Schedly API')
    .setVersion('1.0')
    .addTag('Schedly')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configAPI);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = app.get(ConfigService<ConfigEnv, true>);

  await app.listen(config.get('port'));
}
void bootstrap();
