import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { DTMapService } from './map.service';
import { AppService } from './app.service';

@UntilDestroy()
@Component({
  selector: 'uwmh-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('left') sidenav!: MatSidenav;

  constructor(
    // private service: AppService,
    private mapService: DTMapService,
    private observer: BreakpointObserver,
    private router: Router
  ) {}

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

  onMap(map: Map) {
    this.mapService.map = map;
  }

  attica_boundaries() {
    // const subscription = this.mapService.attica_boundaries();
    // subscription.unsubscribe();
  }

  attica_rivers() {
    // const subscription = this.mapService.attica_rivers();
    // subscription.unsubscribe();
  }
}
