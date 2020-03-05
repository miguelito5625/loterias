import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Diaria1330ListaDeNumerosComponent } from './diaria1330-lista-de-numeros.component';

describe('Diaria1330ListaDeNumerosComponent', () => {
  let component: Diaria1330ListaDeNumerosComponent;
  let fixture: ComponentFixture<Diaria1330ListaDeNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Diaria1330ListaDeNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Diaria1330ListaDeNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
