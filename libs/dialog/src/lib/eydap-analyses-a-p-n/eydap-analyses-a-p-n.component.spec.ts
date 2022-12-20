import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EydapAnalysesAPNComponent } from './eydap-analyses-a-p-n.component';

describe('EydapAnalysesAPNComponent', () => {
  let component: EydapAnalysesAPNComponent;
  let fixture: ComponentFixture<EydapAnalysesAPNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EydapAnalysesAPNComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EydapAnalysesAPNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
