import { HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import Cookies from 'js-cookie';
import {SKIP_AUTH_INTERCEPTOR} from '../utils/http-context-types';

export const authInterceptor: HttpInterceptorFn = (request, next) => {

  if (request.context.get(SKIP_AUTH_INTERCEPTOR)) {
    return next(request);
  }

  const token = Cookies.get('accessToken') || '';

  if (token) {
    const newHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const modifiedReq = request.clone({
      setHeaders: newHeaders
    });

    return next(modifiedReq);
  }

  return next(request);


};
