import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { AtticaRegionComponent } from './attica-region/attica-region.component';

@NgModule({
  declarations: [AtticaRegionComponent],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
