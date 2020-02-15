import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolidoListaDeNumerosComponent } from './bolido-lista-de-numeros.component';

describe('BolidoListaDeNumerosComponent', () => {
  let component: BolidoListaDeNumerosComponent;
  let fixture: ComponentFixture<BolidoListaDeNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolidoListaDeNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolidoListaDeNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
