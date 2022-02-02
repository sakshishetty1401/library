import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.enum';

/**
 * Roles key
 */
export const ROLES_KEY = 'roles';

/**
 * Roles
 * @param roles 
 * @returns 
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);