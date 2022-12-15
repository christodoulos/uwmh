import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { MaterialModule } from '@uwmh/material';

import { MapComponent } from './map/map.component';

import { env } from './env';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxMapboxGLModule.withConfig({
      accessToken: env.mapbox_access_token,
    }),
  ],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapboxModule {}
