import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Diaria2030ListaDeNumerosComponent } from './diaria2030-lista-de-numeros.component';

describe('Diaria2030ListaDeNumerosComponent', () => {
  let component: Diaria2030ListaDeNumerosComponent;
  let fixture: ComponentFixture<Diaria2030ListaDeNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Diaria2030ListaDeNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Diaria2030ListaDeNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
