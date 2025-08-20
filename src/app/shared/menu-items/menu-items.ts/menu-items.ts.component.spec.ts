import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsTsComponent } from './menu-items.ts.component';

describe('MenuItemsTsComponent', () => {
  let component: MenuItemsTsComponent;
  let fixture: ComponentFixture<MenuItemsTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemsTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuItemsTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
