import { BadRequestException, Body, Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import JWT from 'src/dto/jwt.dto';
import { LoginUserDto } from 'src/dto/loginUserDto';
import UserDto from 'src/dto/user.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post("/login")
    @ApiBearerAuth()
    @ApiOperation({ summary: "loggs user in" })
    @ApiCreatedResponse({ description: 'Returns new JWT Token' })
    async login(@Body() loginDto: LoginUserDto, @Res() res: Response): Promise<JWT> {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);

        if (!user) { throw new UnauthorizedException("Invalid credentials.") }

        const token = await this.authService.createToken({ id: user.id, email: user.email, username: user.username });

        res.cookie('refreshToken', await this.authService.createRefreshToken({ id: user.id, email: user.email, username: user.username }), {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: Number(process.env.JWT_REFRESH_EXP) * 24 * 60 * 60 * 1000,
        });

        res.send(token);
        return;
    }

    @Post("/register")
    @ApiBearerAuth()
    @ApiOperation({ summary: "registers new user" })
    @ApiCreatedResponse({ description: 'Returns new JWT Token' })
    async register(@Body() registerDto: UserDto, @Res() res: Response): Promise<any> {

        const foundUser = await this.userService.getUserByUsername(registerDto.username);

        if (foundUser) {
            throw new BadRequestException("User already exists");
        }

        const user = await this.userService.registerUser(registerDto);
        const token = await this.authService.createToken({ id: user.id, email: user.email, username: user.username });

        const refreshToken = await this.authService.createRefreshToken({ id: user.id, email: user.email, username: user.username })

        res.cookie('refreshToken', refreshToken.accessToken.split(" ")[1], {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: Number(process.env.JWT_REFRESH_EXP) * 24 * 60 * 60 * 1000,
        });

        res.send(token);
        return;
    }

    @Post("validate")
    validate(@Req() req: Request) {
        const jwt = req.headers.authorization as string;

        if (!jwt) { throw new UnauthorizedException("No JWT provided!") }

        return this.authService.verifyToken(jwt.split(" ")[1]);
    }

    @Post("/sign")
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Returns new JWT Token', type: JWT })
    async signIn(@Req() req: Request) {
        const jwt = req.headers.authorization as string;

        if (!jwt) { throw new UnauthorizedException("No JWT provided!") }

        const isValidToken = await this.authService.verifyToken(jwt.split(" ")[1]);

        if (!isValidToken) { throw new UnauthorizedException("Provided JWT is invalid.") }

        const decodedToken = this.authService.decodeToken(jwt.split(" ")[1]);

        return await this.authService.createToken(decodedToken.payload);
    }

    @Post("/refresh")
    @ApiCookieAuth('refreshToken')
    @ApiCreatedResponse({ description: 'Generates new Refresh Token as HTTP-only Cookie', type: JWT })
    async getRefreshToken(@Req() request: Request, @Res() res: Response) {
        const isValidToken = await this.authService.verifyToken(request.cookies.refreshToken);

        if (isValidToken) {
            const decodedToken = this.authService.decodeToken(request.cookies.refreshToken);
            const refreshToken = await this.authService.createRefreshToken(decodedToken.payload);
            const token = await this.authService.createToken(decodedToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: Number(process.env.JWT_REFRESH_EXP) * 24 * 60 * 60 * 1000, // days in milliseconds
            });

            res.send(token);
            return;
        }
    }
}
