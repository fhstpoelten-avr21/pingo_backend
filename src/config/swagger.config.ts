import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('PinGO API')
    .setDescription('The PinGO API for the PinGO Frontend (Web-)App')
    .setVersion('0.1')
    .addBearerAuth({
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format **Bearer &lt;token&gt;**',
    })
    .addCookieAuth('refreshToken', {
        type: 'apiKey',
        in: 'cookie',
        name: 'refreshToken',
        description: 'Enter your Http-Only Refresh Token in the **refreshToken** cookie',
    }, 'refreshToken')
    .addTag('pingo')
    .build();