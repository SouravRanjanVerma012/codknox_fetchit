import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInvoiceComponent } from './dashboard-invoice.component';

describe('DashboardInvoiceComponent', () => {
  let component: DashboardInvoiceComponent;
  let fixture: ComponentFixture<DashboardInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
