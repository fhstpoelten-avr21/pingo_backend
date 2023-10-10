import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import JWT from 'src/dto/jwt.dto';
import { DecodedJWT, JWTPayload } from 'src/model/local/decodedJWT';
import { User } from 'src/model/entities/user.entity';
import { UserRepository } from 'src/repositories/user-repository/user.repository';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository
    ) { }

    decodeToken(jwtToken: string): JWTPayload {
        return this.jwtService.decode(jwtToken) as JWTPayload;
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findUserByUsername(username);

        if (!user) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        return user;
    }

    async verifyToken(jwtToken: string) {
        try {
            return await this.jwtService.verifyAsync(jwtToken, { secret: process.env.JWT_SECRET });
        } catch (e) {
            throw new UnauthorizedException("Invalid JWT Token.");
        }
    }

    async createToken(payload: JWTPayload, options?: JwtSignOptions): Promise<JWT> {
        const token = await this.jwtService.signAsync(payload, options ? options : { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXP });
        return { accessToken: `Bearer ${token}` };
    }

    async createRefreshToken(payload: JWTPayload, options?: JwtSignOptions): Promise<JWT> {
        return await this.createToken(payload, options ? options : { secret: process.env.JWT_REFRESH_SECRET, expiresIn: "30d" })
    }


}
