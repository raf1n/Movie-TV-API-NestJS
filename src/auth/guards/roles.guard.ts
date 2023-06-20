import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      // No roles specified, allow access
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole = user.role; // Assuming the authenticated user's role is stored in the `role` property

    const hasRequiredRole = requiredRoles.includes(userRole);

    return hasRequiredRole;
  }
}
