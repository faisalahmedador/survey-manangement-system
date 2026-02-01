import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {AuthResponseDto} from "./dto/auth-response.dto/auth-response.dto";
import {Role} from "../common/enums/role/role";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
    }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        const isPasswordVerified = await bcrypt.compare(password, user!.passwordHash)

        if (!isPasswordVerified) {
            new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            email: user!.email,
            sub: user!.id,
            role: user!.email === 'admin@example.com' ? Role.ADMIN : Role.OFFICER
        }

        return {
            accessToken: this.jwtService.sign(payload)
        }




    }
}
