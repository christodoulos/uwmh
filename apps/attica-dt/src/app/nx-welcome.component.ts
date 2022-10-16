import { Component, OnInit, ViewEncapsulation } from '@angular/core';
/* eslint-disable */

@Component({
  selector: 'uwmh-nx-welcome',
  template: `
    <div class="flex h-screen">
      <div class="m-auto flex flex-col">
        <mat-card>
          <mat-card-title>Login</mat-card-title>
          <mat-card-content>
            <form fxLayout="column" fxLayoutAlign="center none">
              <mat-form-field>
                <input matInput placeholder="username" type="text" #username />
              </mat-form-field>
              <mat-form-field>
                <input matInput placeholder="password" type="text" #password />
              </mat-form-field>
            </form>
            <button mat-raised-button>login</button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
