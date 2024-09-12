import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
// import { headerInterceptor } from './core/interceptores/header.interceptor';
import { errorsInterceptor } from './core/interceptores/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptores/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withViewTransitions(),
    withInMemoryScrolling({scrollPositionRestoration:"top"})),
     provideClientHydration(),provideHttpClient(withFetch(),withInterceptors([errorsInterceptor,loadingInterceptor])),
     importProvidersFrom(RouterModule ,BrowserAnimationsModule,NgxSpinnerModule ),
     provideToastr()  ,

    ]
}

