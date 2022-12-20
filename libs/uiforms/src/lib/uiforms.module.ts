import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@uwmh/material';

import { EydapAnalysesAPNComponent } from './eydap-analyses-a-p-n/eydap-analyses-a-p-n.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [EydapAnalysesAPNComponent],
  exports: [EydapAnalysesAPNComponent],
})
export class UiformsModule {}
