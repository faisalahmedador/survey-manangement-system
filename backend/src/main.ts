import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/utils/http-exception.filters";
import {ResponseInterceptor} from "./common/interceptors/response-interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter())
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 'no-store');
        next();
    });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
