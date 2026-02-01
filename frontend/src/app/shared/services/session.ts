import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Session {
  public userSessionSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userSession: Observable<any> = this.userSessionSubject as Observable<any>;

  setSession(session: any) {
    this.userSessionSubject.next(session);
  }
}
