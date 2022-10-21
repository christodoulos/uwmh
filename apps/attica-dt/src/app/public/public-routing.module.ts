import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtticaRegionRiversComponent } from './attica-region-rivers/attica-region-rivers.component';
import { AtticaRegionBoundariesComponent } from './attica-region-boundaries/attica-region-boundaries.component';

const routes: Routes = [
  { path: 'boundaries', component: AtticaRegionBoundariesComponent },
  { path: 'rivers', component: AtticaRegionRiversComponent },
  { path: '', component: AtticaRegionBoundariesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
