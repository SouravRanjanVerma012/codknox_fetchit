import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareManagementComponent } from './fare-management.component';

describe('FareManagementComponent', () => {
  let component: FareManagementComponent;
  let fixture: ComponentFixture<FareManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
