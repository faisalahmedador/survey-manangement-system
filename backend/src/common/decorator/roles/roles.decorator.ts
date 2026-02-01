import {Reflector} from "@nestjs/core";
import {Role} from "../../enums/role/role";

export const Roles = Reflector.createDecorator<Role[]>()
