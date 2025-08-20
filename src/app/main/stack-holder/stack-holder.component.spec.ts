import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackHolderComponent } from './stack-holder.component';

describe('StackHolderComponent', () => {
  let component: StackHolderComponent;
  let fixture: ComponentFixture<StackHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackHolderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
