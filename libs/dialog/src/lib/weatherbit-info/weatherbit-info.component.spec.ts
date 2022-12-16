import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherbitInfoComponent } from './weatherbit-info.component';

describe('WeatherbitInfoComponent', () => {
  let component: WeatherbitInfoComponent;
  let fixture: ComponentFixture<WeatherbitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherbitInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherbitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
