import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';
import { environment } from '../environments/environment';

import { MaterialModule } from '@uwmh/material';
import { UiModule } from '@uwmh/ui';
import { DialogModule } from '@uwmh/dialog';

import {
  SourcesRepository,
  LayersRepository,
  MapWhereRepository,
  UIRepository,
  UserRepository,
} from '@uwmh/state';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'Attica Digital Twin',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [AppComponent, MapComponent, GoogleSigninComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./public/public.module').then((m) => m.PublicModule),
      // },
    ]),
    UiModule,
    DialogModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    }),
    MaterialModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox_access_token,
    }),
  ],
  providers: [
    !environment.production
      ? {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: initElfDevTools,
          deps: [Actions],
        }
      : [],
    SourcesRepository,
    LayersRepository,
    MapWhereRepository,
    UIRepository,
    UserRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
