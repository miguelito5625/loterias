import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiariaListaDeNumerosComponent } from './diaria-lista-de-numeros.component';

describe('DiariaListaDeNumerosComponent', () => {
  let component: DiariaListaDeNumerosComponent;
  let fixture: ComponentFixture<DiariaListaDeNumerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiariaListaDeNumerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiariaListaDeNumerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
