import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';

export const services = [AuthService, UserService, TokenService];

export * from './auth.service';
export * from './user.service';
export * from './token.service';
