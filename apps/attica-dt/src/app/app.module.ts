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

import {
  LayersRepository,
  MapWhereRepository,
  SourcesRepository,
  UIRepository,
} from './state';

import { MaterialModule } from '@uwmh/material';
import { UiModule } from '@uwmh/ui';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { WelcomeDialogComponent } from './dialogs/welcome-dialog/welcome-dialog.component';
import { LayerToggleComponent } from './dialogs/layer-toggle/layer-toggle.component';
import { MapInfoComponent } from './dialogs/map-info/map-info.component';
import { DrawnFeaturesRepository } from './state/draw';
import { DrawnGeoJsonComponent } from './dialogs/drawn-geo-json/drawn-geo-json.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { UserRepository } from './state/user';
import { SignUpComponent } from './dialogs/sign-up/sign-up.component';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'Attica Digital Twin',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    GoogleSigninComponent,
    SignUpComponent,
  ],
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
    UIRepository,
    MapWhereRepository,
    DrawnFeaturesRepository,
    UserRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
