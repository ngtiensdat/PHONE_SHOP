import type { Request, Response } from 'express';
import type { UserPayload } from '../../common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        fullName: string | null | undefined;
        avatarUrl: string | null | undefined;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            fullName: string | null | undefined;
            avatarUrl: string | null | undefined;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    } | {
        accessToken: null;
    }>;
    logout(user: UserPayload, res: Response): Promise<{
        success: boolean;
    }>;
    getProfile(user: UserPayload): Promise<{
        id: number;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        fullName: string | null | undefined;
        avatarUrl: string | null | undefined;
    }>;
}
