import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        id: number;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        fullName: string | null | undefined;
        avatarUrl: string | null | undefined;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            fullName: string | null | undefined;
            avatarUrl: string | null | undefined;
        };
    }>;
    refresh(token: string): Promise<{
        accessToken: string;
    }>;
    logout(userId: number): Promise<void>;
    getProfile(userId: number): Promise<{
        id: number;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        fullName: string | null | undefined;
        avatarUrl: string | null | undefined;
    }>;
}
