import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EffectsNgModule, Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';

import { UiModule } from '@uwmh/ui';
import { BoundaryEffects } from '@uwmh/state';

import { AppComponent } from './app.component';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'Attica Digital Twin',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./public/public.module').then((m) => m.PublicModule),
      },
    ]),
    HttpClientModule,
    EffectsNgModule.forRoot([BoundaryEffects]),
    UiModule,
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
