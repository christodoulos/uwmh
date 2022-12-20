import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@uwmh/material';

import { EydapAnalysesAPNFormComponent } from './eydap-analyses-a-p-n/eydap-analyses-a-p-n.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [EydapAnalysesAPNFormComponent],
  exports: [EydapAnalysesAPNFormComponent],
})
export class UiformsModule {}
