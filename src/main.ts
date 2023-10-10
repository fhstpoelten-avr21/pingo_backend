import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config/swagger.config";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./config/globalExceptionFilter";
import * as cookieParser from "cookie-parser";
import { IoAdapter } from "@nestjs/platform-socket.io";



class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      cors: {
        origin: [
          'http://pingo.1dev.at',
        'http://www.pingo.1dev.at',
        'https://pingo.1dev.at',
        'https://www.pingo.1dev.at',
        'https://pingo.mobile.media.fhstp.ac.at',
        'https://www.pingo.mobile.media.fhstp.ac.at',
        'http://localhost:8100',
        'http://www.localhost:8100',
        'https://localhost:3000',
        'https://localhost',
        'https://www.pingo-app.at',
        'https://pingo-app.at'
        ],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    
    return server;
  }
}



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  

  // set up for CORS config
  // allows requests from specified external URLs 
  app.enableCors(
    {
      origin: [
        'http://pingo.1dev.at',
        'http://www.pingo.1dev.at',
        'https://pingo.1dev.at',
        'https://www.pingo.1dev.at',
        'https://pingo.mobile.media.fhstp.ac.at',
        'https://www.pingo.mobile.media.fhstp.ac.at',
        'http://localhost:8100',
        'http://www.localhost:8100',
        'https://localhost:3000',
        'https://www.pingo-app.at',
        'https://pingo-app.at',
        'https://localhost'
      ],
    }
  );

  // Config for Swagger API
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  // activates Validation in App
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
  }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.use(cookieParser());
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(4000);
}
bootstrap();
