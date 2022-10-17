import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@uwmh/material';

import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
  declarations: [TopbarComponent, LayoutComponent],
  exports: [TopbarComponent, LayoutComponent],
})
export class UiModule {}
