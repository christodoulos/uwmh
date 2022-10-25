import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsNgModule, Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';

import { MaterialModule } from './material/material.module';
import { BoundaryEffects, RiverEffects } from './state';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'Attica Digital Twin',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [AppComponent, MapComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./public/public.module').then((m) => m.PublicModule),
      // },
    ]),
    HttpClientModule,
    EffectsNgModule.forRoot([BoundaryEffects, RiverEffects]),
    MaterialModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initElfDevTools,
      deps: [Actions],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
