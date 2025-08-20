import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDocumentApprovalComponent } from './driver-document-approval.component';

describe('DriverDocumentApprovalComponent', () => {
  let component: DriverDocumentApprovalComponent;
  let fixture: ComponentFixture<DriverDocumentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverDocumentApprovalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDocumentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
