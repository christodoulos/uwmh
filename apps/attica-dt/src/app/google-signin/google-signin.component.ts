declare let google: any;

import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { accounts } from 'google-one-tap';
import { environment } from '../../environments/environment';
import { GoogleUserInfo, UserDTO } from '@uwmh/data';
import { UserRepository } from '../state/user';
import { BackendService } from '../backend.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../dialogs/sign-up/sign-up.component';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private dialog: MatDialog,
    private jwtHelper: JwtHelperService
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
    const { email, name, given_name, picture } =
      this.jwtHelper.decodeToken(token);

    this.subscription = this.backend
      .getUserByEmail(email)
      .subscribe((data: UserDTO | null) => {
        if (data) {
          this.backend.signInUser(token).subscribe((d) => {
            console.log(this.jwtHelper.decodeToken(d.jwt));
            // Should we decode the backend's jwt here?
            this.user.updateUser(data);
          });
        } else {
          const dialogRef = this.dialog.open(SignUpComponent, {
            data: {
              email,
              name,
              given_name,
              picture,
            },
          });
          dialogRef.afterClosed().subscribe((data: UserDTO) => {
            this.backend.signUpUser(token, data).subscribe((data) => {
              console.log(data, this.jwtHelper.decodeToken(data.jwt)['_doc']);
              this.user.updateUser(
                this.jwtHelper.decodeToken(data.jwt)['_doc']
              );
            });
          });
        }
      });
  }

  // decodeJwtResponse(token: string): UserDTO {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(
  //     window
  //       .atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );
  //   return JSON.parse(jsonPayload) as UserDTO;
  // }
}
