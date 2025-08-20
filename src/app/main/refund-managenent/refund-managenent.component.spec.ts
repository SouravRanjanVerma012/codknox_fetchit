import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundManagenentComponent } from './refund-managenent.component';

describe('RefundManagenentComponent', () => {
  let component: RefundManagenentComponent;
  let fixture: ComponentFixture<RefundManagenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundManagenentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundManagenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
