import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {Jwt} from "./jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  providers: [AuthService, Jwt],
  imports: [
      UserModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              secret: configService.get('JWT_SECRET_KEY'),
              signOptions: {expiresIn: '1d'}
          })

      })
  ],
  controllers: [AuthController]

})
export class AuthModule {}
