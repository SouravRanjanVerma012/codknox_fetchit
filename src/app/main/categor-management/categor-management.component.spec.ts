import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorManagementComponent } from './categor-management.component';

describe('CategorManagementComponent', () => {
  let component: CategorManagementComponent;
  let fixture: ComponentFixture<CategorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
