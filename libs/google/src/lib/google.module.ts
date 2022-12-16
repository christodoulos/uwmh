import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GoogleSigninComponent],
  exports: [GoogleSigninComponent],
})
export class GoogleModule {}
