import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * JWtAuthguard for authorization
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}