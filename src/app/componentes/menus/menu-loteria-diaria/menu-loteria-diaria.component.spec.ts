import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLoteriaDiariaComponent } from './menu-loteria-diaria.component';

describe('MenuLoteriaDiariaComponent', () => {
  let component: MenuLoteriaDiariaComponent;
  let fixture: ComponentFixture<MenuLoteriaDiariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLoteriaDiariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLoteriaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
