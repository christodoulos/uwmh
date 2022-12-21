import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EYDAP_APN, EYDAP_APN_ANALYSES_Entities } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-apn',
  templateUrl: './eydap-apn.component.html',
  styleUrls: ['./eydap-apn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapApnComponent implements OnDestroy, AfterViewInit {
  constructor(private eydap_apn: EYDAP_APN_ANALYSES_Entities) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() editRow = new EventEmitter<EYDAP_APN>();
  entities$ = this.eydap_apn.allEntities$;
  dataSource = new MatTableDataSource<EYDAP_APN>();
  subscription = this.entities$.subscribe((entities) => {
    this.dataSource.data = entities;
  });
  displayedColumns: string[] = [
    'timestamp',
    'total_suspended_solids',
    'biochemical_oxygen_demand',
    'total_nitrogen',
    'ammonium',
    'turbidity',
    'total_carbon',
    'electric_conductivity',
  ];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClick(row: EYDAP_APN) {
    this.editRow.emit(row);
  }
}
