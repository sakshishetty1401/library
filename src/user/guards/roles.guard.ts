import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../role.enum";
import { ROLES_KEY } from "../roles/roles.decorators";

/**
 * Implements canactive
 */
@Injectable()
export class RolesGuard implements CanActivate{

  /**
   * Dependency Injection
   * @param reflector 
   */
    constructor(private reflector: Reflector) {}

    /**
     * CanActive
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (!requiredRoles) {
            return true;
          }
          const { user } = context.switchToHttp().getRequest();
          console.log(user);
          return requiredRoles.some((role) => user.role?.includes(role));
    }
    
}