import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { AllExceptionsFilter } from './shared/error/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação - App Exato')
    .setDescription('API da aplicação')
    .setVersion('1.0')
    .addTag('users')
    .addTag('clients')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = 5555;

  const FRONTEND_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL_DEV;

  app.enableCors({
    origin: [
      FRONTEND_URL,
      'http://localhost:56201',
      'http://192.168.15.93:4000',
    ], // Substitua pelo endereço do seu frontend, se diferente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type, Accept',
  });

  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server started on ${PORT}`),
  );
}

bootstrap();
