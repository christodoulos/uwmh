import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDTO } from '@uwmh/state';

@Component({
  selector: 'uwmh-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserDTO) {}
}
