import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAnalyticComponent } from './passenger-analytic.component';

describe('PassengerAnalyticComponent', () => {
  let component: PassengerAnalyticComponent;
  let fixture: ComponentFixture<PassengerAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerAnalyticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
