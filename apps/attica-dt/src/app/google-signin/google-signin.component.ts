declare let google: any;

import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { accounts } from 'google-one-tap';
import { environment } from '../../environments/environment';
import { UserDTO } from '@uwmh/data';
import { UserRepository, BackendService } from '@uwmh/state';
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
        text: 'signin',
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
            // Should we decode the backend's jwt here?
            this.user.updateUser(this.jwtHelper.decodeToken(d.jwt)['_doc']);
            localStorage.setItem('access_token', d.jwt);
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
              localStorage.setItem('access_token', data.jwt);
            });
          });
        }
      });
  }
}
