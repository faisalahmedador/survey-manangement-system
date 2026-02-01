import {
  Component,
  inject,output,
  signal,
} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Button, ButtonDirective} from 'primeng/button';
import {Menu} from 'primeng/menu';
import {Auth} from '../../shared/services/auth';
import {MenuItem} from 'primeng/api';
import {Session} from '../../shared/services/session';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  imports: [
    Menu,
    Button,
    RouterLink,
    ButtonDirective,
  ],
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {
  userItems = signal<MenuItem[]>([]);
  userSession!: any;
  toggle = output();

  auth = inject(Auth);
  router = inject(Router)
  sessionService = inject(Session)
  unsubscribe$ = new Subject()


  ngOnInit() {
    this.setUserData();
  }

  private setUserData() {
    this.sessionService.userSession.pipe(takeUntil(this.unsubscribe$)).subscribe(async session => {
      this.userSession = session;
      console.log(this.userSession)
      this.buildMenu();
    })
  }

  logout() {
    this.auth.logout();
  }

  async buildMenu() {


    this.userItems.set([
      {
        label: this.userSession.email,
        icon: 'pi pi-user_employee',
        items: [
          {
            label: 'Logout', command: (event: any) => {
              this.logout();
            }
          },
        ]
      }
    ]);
  }

  public toggleMenu() {
    this.toggle.emit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
