import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@uwmh/material';

import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { QuickNavigationComponent } from './quick-navigation/quick-navigation.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    AvatarMenuComponent,
    QuickNavigationComponent,
    TopbarComponent,
    GoogleSigninComponent,
  ],
  exports: [
    AvatarMenuComponent,
    QuickNavigationComponent,
    TopbarComponent,
    GoogleSigninComponent,
  ],
})
export class UiModule {}
