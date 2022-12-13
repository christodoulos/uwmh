declare let google: any;

import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { accounts } from 'google-one-tap';
import { environment } from '../../environments/environment';
import { GoogleUserInfo, UserDTO } from '@uwmh/data';
import { UserRepository } from '../state/user';
import { BackendService } from '../backend.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from '../dialogs/sign-up/sign-up.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uwmh-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css'],
})
export class GoogleSigninComponent implements AfterViewInit, OnDestroy {
  subscription: Subscription | undefined;
  constructor(
    private ngZone: NgZone,
    private user: UserRepository,
    private backend: BackendService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const gAccounts: accounts = google.accounts;

    gAccounts.id.initialize({
      client_id: environment.google_client_id,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this.continueWithGoogle(credential);
        });
      },
    });

    gAccounts.id.renderButton(
      document.getElementById('google-button') as HTMLElement,
      {
        type: 'icon',
        size: 'medium',
      }
    );
  }

  continueWithGoogle(token: string) {
    const { email, name, given_name, family_name, picture } =
      this.decodeJwtResponse(token);

    this.subscription = this.backend
      .getUserByEmail(email)
      .subscribe((data: UserDTO | null) => {
        if (data) {
          this.user.updateUser(data);
        } else {
          const dialogRef = this.dialog.open(SignUpComponent, {
            data: { email, name, given_name, family_name, picture },
          });
          dialogRef.afterClosed().subscribe((data: UserDTO) => {
            console.log('DDDDDDDDDDDDDDATA', data);
            this.backend.signUpUser(data).subscribe((jwt) => {
              console.log(jwt);
            });
          });
        }
      });
  }

  decodeJwtResponse(token: string): GoogleUserInfo {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload) as GoogleUserInfo;
  }
}
