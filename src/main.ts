import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import validationPipe from 'pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationPipe);

  await app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

bootstrap();
