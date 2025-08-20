import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickdropManagementComponent } from './pickdrop-management.component';

describe('PickdropManagementComponent', () => {
  let component: PickdropManagementComponent;
  let fixture: ComponentFixture<PickdropManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickdropManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickdropManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
