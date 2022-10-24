import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantNurseryComponent } from './plant-nursery.component';

describe('PlantNurseryComponent', () => {
  let component: PlantNurseryComponent;
  let fixture: ComponentFixture<PlantNurseryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantNurseryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantNurseryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
