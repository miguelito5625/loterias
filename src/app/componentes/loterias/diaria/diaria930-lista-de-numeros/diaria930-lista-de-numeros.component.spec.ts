import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Diaria930ListaDeNumerosComponent } from './diaria930-lista-de-numeros.component';

describe('Diaria930ListaDeNumerosComponent', () => {
  let component: Diaria930ListaDeNumerosComponent;
  let fixture: ComponentFixture<Diaria930ListaDeNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Diaria930ListaDeNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Diaria930ListaDeNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
