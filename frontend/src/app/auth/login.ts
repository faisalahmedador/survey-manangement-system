import {Component, HostListener, inject, input, signal, viewChild} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {NgClass} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Auth} from '../shared/services/auth';
import Cookies from 'js-cookie';
import {Session} from '../shared/services/session';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputText,
    Button,
    ProgressSpinner,
    NgClass,
    InputGroup,
    InputGroupAddon
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loading = signal(false);
  error = signal('');
  submitted = false;
  loginForm!: UntypedFormGroup;
  authService = inject(Auth);
  sessionService = inject(Session);
  formBuilder = inject(UntypedFormBuilder);
  router = inject(Router)

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }


  performLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading.set(true);

    const loginData = this.loginForm.value;
    this.authService.login(loginData)
      .subscribe({
        next: (user: any) => {
          if (user.data?.accessToken) {
            Cookies.set('accessToken', user.data.accessToken);
            this.setupSession();
          }
         this.loading.set(false);
        },
        error: (error: any) => {
          this.error.set(error.error.message);
          this.loading.set(false);
        }
      })
  }

  setupSession() {
    this.authService.session().subscribe(session => {
      if (!session) {
        this.authService.logout();
        return;
      }
      this.sessionService.setSession(session.data);
      this.router.navigate(['/']);
    })
  }
}
