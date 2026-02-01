import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException, HttpStatus,
    Post,
    Req,
    UnauthorizedException,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto/auth.dto";
import {JwtAuthGuard} from "../common/guards/jwt-auth/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: AuthDto) {
        try {
            return await this.authService.login(loginDto.email, loginDto.password)
        } catch (e) {
            throw new UnauthorizedException('Invalid credentials');
        }

    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get('session')
    async session(@Req() req: Request) {
        return req["user"]
    }
}
