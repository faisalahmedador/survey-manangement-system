import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LayoutHeaderComponent} from '../layout-header/layout-header.component';
import {NgClass} from '@angular/common';
import {PanelMenu} from 'primeng/panelmenu';
import {Toast} from 'primeng/toast';
import {Subject, takeUntil} from 'rxjs';
import {Session} from '../../shared/services/session';


@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  imports: [
    LayoutHeaderComponent,
    NgClass,
    PanelMenu,
    RouterOutlet,
    Toast,
  ],
  styleUrls: ['./layout-home.component.scss']
})
export class LayoutHomeComponent  {
  displaySidebar = signal(true);
  items = signal<any[]>([]);
  privileges: any = {};
  userSession!: any;
  router = inject(Router);
  sessionService = inject(Session);
  unsubscribe$ = new Subject()

  ngOnInit() {
    this.setUserData();
  }

  private setUserData() {
    this.sessionService.userSession.pipe(takeUntil(this.unsubscribe$)).subscribe(session => {
      this.userSession = session;
      this.loadMenuItems();
    })
  }

  async loadMenuItems() {

    this.items.set([
      {
        label: 'Survey Builder',
        icon: 'pi pi-file-edit',
        visible: this.userSession.role === 'ADMIN',
        items: [
          {
            label: 'Survey List',
            icon: 'pi pi-folder-open',
            routerLink: ['survey/survey-builder/list'],
            routerLinkActiveOptions: { exact: true },
            visible: this.userSession.role === 'ADMIN'
          },
          {
            label: 'Create Survey',
            icon: 'pi pi-plus-circle',
            routerLink: ['survey/survey-builder/create'],
            routerLinkActiveOptions: { exact: true },
            visible: this.userSession.role === 'ADMIN'
          }
        ]
      },

      {
        label: 'Survey Consumers',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Survey Submission List',
            icon: 'pi pi-inbox',
            routerLink: ['survey/survey-consumer/submission-list'],
            routerLinkActiveOptions: { exact: true },
            visible: this.userSession.role === 'ADMIN'
          },
          {
            label: 'Available Surveys',
            icon: 'pi pi-file',
            routerLink: ['survey/survey-consumer/survey-list'],
            routerLinkActiveOptions: { exact: true },
            visible: this.userSession.role === 'OFFICER'
          }
        ]
      },
    ]);
  }

  // disableNavigation(e) {
  //   e.routerLink = [''];
  // }

  toggleMenu() {
    this.displaySidebar.update(prevState => !prevState);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
