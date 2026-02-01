import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import Cookies from 'js-cookie';
import {Auth} from './auth';
import {Session} from './session';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppInit {
  sessionService = inject(Session)
  authService = inject(Auth)
  router = inject(Router)

  constructor() {
  }

  Init() {
    return new Promise<void>(async (resolve, reject) => {
      if (Cookies.get('accessToken')) {
        try {
          const userSessionResponse = await firstValueFrom(this.authService.session());
          console.log(userSessionResponse);
          if (!userSessionResponse?.success) {
            Cookies.remove('accessToken');
            resolve();
            return;
          }
          this.sessionService.setSession(userSessionResponse.data);
          resolve();

        } catch (error) {
          Cookies.remove('accessToken');
          resolve();
          this.router.navigate(['login']);
        }
      } else {
        this.router.navigate([' login']);
        resolve();
      }
    });
  }
}
