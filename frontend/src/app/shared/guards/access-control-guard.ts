import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Session} from '../services/session';
import {filter, map, take} from 'rxjs';

export const accessControlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(Session)

  const allowedRole = route.data["role"]

  if (!allowedRole) return true;

  return session.userSession.pipe(
    filter(s => !!s),
    take(1),
    map(s => {
      if (s.role.includes(allowedRole)) return true;
      return router.createUrlTree(['/404']);
    })

  )
};
