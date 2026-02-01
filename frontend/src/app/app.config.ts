import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {primengPreset} from './core/primengSettings';
import {AppInit} from './shared/services/app-init';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './shared/interceptors/auth-interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    ConfirmationService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: primengPreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
          cssLayer: false,
        },
      },
    }),
    provideAppInitializer(() => {
      const appInit = inject(AppInit)
      return appInit.Init()
    }),
  ]
};
