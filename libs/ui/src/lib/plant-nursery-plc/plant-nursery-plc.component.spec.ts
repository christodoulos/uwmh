import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantNurseryPlcComponent } from './plant-nursery-plc.component';

describe('PlantNurseryPlcComponent', () => {
  let component: PlantNurseryPlcComponent;
  let fixture: ComponentFixture<PlantNurseryPlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantNurseryPlcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantNurseryPlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
