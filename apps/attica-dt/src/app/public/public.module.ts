import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { PublicRoutingModule } from './public-routing.module';
import { AtticaRegionBoundariesComponent } from './attica-region-boundaries/attica-region-boundaries.component';
import { AtticaRegionRiversComponent } from './attica-region-rivers/attica-region-rivers.component';

@NgModule({
  declarations: [AtticaRegionBoundariesComponent, AtticaRegionRiversComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PublicRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
})
export class PublicModule {}
