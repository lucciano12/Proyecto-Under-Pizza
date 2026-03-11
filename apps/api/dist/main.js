"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Rótulos QR API')
        .setDescription('API REST para gestión de productos con códigos QR. Permite crear productos, generar QR, escanear y registrar movimientos.')
        .setVersion('1.0')
        .addTag('productos', 'Gestión de productos')
        .addTag('categorías', 'Gestión de categorías')
        .addTag('movimientos', 'Registro de movimientos de productos')
        .addServer('http://localhost:3000', 'Desarrollo local')
        .addServer('https://3.17.152.56:3000', 'Produccion EC2')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Rótulos QR API Docs',
        customfavIcon: 'https://nestjs.com/img/logo-small.svg',
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #e535ab }
    `,
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`\n🚀 API corriendo en: http://localhost:${port}`);
    console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs\n`);
    console.log(`📚 Swagger Docs: http://3.17.152.56:${port}/api/docs\n`);
}
bootstrap();
//# sourceMappingURL=main.js.map