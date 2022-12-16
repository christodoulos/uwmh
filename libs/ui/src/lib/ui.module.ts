import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@uwmh/material';

import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { QuickNavigationComponent } from './quick-navigation/quick-navigation.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { AtticadtComponent } from './atticadt/atticadt.component';
import { MapboxModule } from '@uwmh/mapbox';
import {
  PNPLCEntities,
  PNWeatherRepository,
  UIRepository,
  UserRepository,
} from '@uwmh/state';

@NgModule({
  imports: [CommonModule, MaterialModule, MapboxModule],
  declarations: [
    AvatarMenuComponent,
    QuickNavigationComponent,
    TopbarComponent,
    GoogleSigninComponent,
    AtticadtComponent,
  ],
  exports: [
    AvatarMenuComponent,
    QuickNavigationComponent,
    TopbarComponent,
    GoogleSigninComponent,
    AtticadtComponent,
  ],
  providers: [UserRepository, UIRepository, PNWeatherRepository, PNPLCEntities],
})
export class UiModule {}
