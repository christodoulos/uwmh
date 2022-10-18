import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtticaRegionComponent } from './attica-region/attica-region.component';

const routes: Routes = [{ path: '', component: AtticaRegionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
