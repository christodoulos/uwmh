import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EydapApnComponent } from './eydap-apn.component';

describe('EydapApnComponent', () => {
  let component: EydapApnComponent;
  let fixture: ComponentFixture<EydapApnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EydapApnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EydapApnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
