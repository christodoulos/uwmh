import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@uwmh/material';
import { UiModule } from '@uwmh/ui';

import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LayerToggleComponent } from './layer-toggle/layer-toggle.component';
import { MapInfoComponent } from './map-info/map-info.component';
import { DrawnGeoJsonComponent } from './drawn-geo-json/drawn-geo-json.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [CommonModule, FormsModule, MaterialModule, UiModule],
  declarations: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
  ],
  exports: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
  ],
})
export class DialogModule {}
