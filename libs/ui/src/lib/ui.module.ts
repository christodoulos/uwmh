import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@uwmh/material';

import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule],
  declarations: [TopbarComponent],
  exports: [TopbarComponent],
})
export class UiModule {}
