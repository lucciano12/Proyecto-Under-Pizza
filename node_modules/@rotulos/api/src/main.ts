import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Rótulos QR API')
    .setDescription(
      'API REST para gestión de productos con códigos QR. Permite crear productos, generar QR, escanear y registrar movimientos.',
    )
    .setVersion('1.0')
    .addTag('productos', 'Gestión de productos')
    .addTag('categorías', 'Gestión de categorías')
    .addTag('movimientos', 'Registro de movimientos de productos')
    .addServer('http://localhost:3000', 'Desarrollo local')
    .addServer('https://3.17.152.56:3000', 'Produccion EC2')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Rótulos QR API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #e535ab }
    `,
  });

  const port = process.env.PORT ?? 3000; //
  await app.listen(port);

  // Logs informativos
  console.log(`\n🚀 API corriendo en: http://localhost:${port}`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs\n`);
  console.log (`📚 Swagger Docs: http://3.17.152.56:${port}/api/docs\n`);
}
bootstrap();
