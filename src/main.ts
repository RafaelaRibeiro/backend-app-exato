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
  const PORT = process.env.PORT || 3000;

  const FRONTEND_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL_DEV;

  app.enableCors({
    origin: [
      FRONTEND_URL,
      'https://portal-production-982a.up.railway.app',
      'https://painel-production-6187.up.railway.app',
      'https://painel.exatoinovacoes.com.br',
      'https://portal.exatoinovacoes.com.br',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Authorization, Content-Type, Accept',
  });

  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`Server started on ${PORT}`),
  );
}

bootstrap();
