import {CanActivateFn, Router} from '@angular/router';
import Cookies from 'js-cookie';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (Cookies.get('accessToken')) return true;

  const router = inject(Router);
  router.navigate(['/login']);
  return false;

};
