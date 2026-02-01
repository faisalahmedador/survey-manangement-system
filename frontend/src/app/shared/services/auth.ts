import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private LOGIN_URL = environment.apiUrl + '/auth/login';
  private SESSION_URL = environment.apiUrl + '/auth/session';
  http = inject(HttpClient);
  router = inject(Router);

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, formData);
  }

  session(): Observable<any> {
    return this.http.get<any>(this.SESSION_URL);
  }


  public logout() {
    localStorage.clear();
    Cookies.remove('accessToken');
    this.router.navigate(['/login']);
  }
}
