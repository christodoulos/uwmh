import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { AppService } from './app.service';
import { WelcomeDialogComponent } from './dialogs/welcome-dialog/welcome-dialog.component';
import { UIRepository } from './state';

@UntilDestroy()
@Component({
  selector: 'uwmh-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('left') sidenav!: MatSidenav;

  constructor(
    private service: AppService,
    private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private ui: UIRepository
  ) {}

  ngOnInit() {
    this.ui.setIsLoading(true);
    this.dialog.open(WelcomeDialogComponent);
  }

  ngAfterViewInit() {
    this.observer
      .observe('(max-width: 800px)')
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  async onMap(map: Map) {
    await this.service.setupMap(map);
  }

  attica_bounds() {
    this.service.boundary_zoom();
  }

  rivers() {
    this.service.rivers();
  }

  nursery() {
    this.service.nursery();
  }
}
