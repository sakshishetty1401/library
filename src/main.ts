import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionExceptionFilter } from './common/exception-filter/exception-filter.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

/**
 * Start you application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new ExceptionExceptionFilter()) //Global filter
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  app.useGlobalInterceptors(new ResponseInterceptor());
   
  /**
   * documentation for API - swagger config
   */
  
  let swaggerConfig = new DocumentBuilder()
    .setTitle('stocks-trading-api')
    .setDescription('stock-trading appplication api documentation')
    .setVersion('1.0')
    .setContact('sakshi', '', 'sakshi.shetty@hcl.com')
    .addBearerAuth({
      type:'http',bearerFormat:'JWT',scheme:'bearer', name:'header',in:'header'
    }, 'swagger-auth')
    .build()

  let document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('stocks-trading', app, document)  // setup the path
  await app.listen(3000);
}
bootstrap();
