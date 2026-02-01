import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Roles} from "../common/decorator/roles/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }
      canActivate(context: ExecutionContext): boolean  {
        const roles = this.reflector.get(Roles, context.getHandler())
          if (!roles) return true;
          const request = context.switchToHttp().getRequest();
          const user = request.user;
          return roles.includes(user.role);
      }
}
