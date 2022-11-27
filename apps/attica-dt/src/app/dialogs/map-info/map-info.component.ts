import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PNPLCEntities, PNWeatherRepository } from '../../state';
import { PNPLC } from '@uwmh/data';

@Component({
  selector: 'uwmh-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'ts',
    'col3',
    'col4',
    'col5',
    'col6',
    'col7',
    'col8',
    'col9',
    'col10',
    'col11',
  ];
  dataSource = new MatTableDataSource<PNPLC>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  weatherData$ = this.pnWeather.weatherData$;
  plcEntities$ = this.pnPLC.allEntities$;

  constructor(
    private pnWeather: PNWeatherRepository,
    private pnPLC: PNPLCEntities
  ) {}

  ngOnInit(): void {
    this.plcEntities$.subscribe(
      (entities) => (this.dataSource.data = entities)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
