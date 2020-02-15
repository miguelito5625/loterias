import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteInicioSesionComponent } from './componente-inicio-sesion.component';

describe('ComponenteInicioSesionComponent', () => {
  let component: ComponenteInicioSesionComponent;
  let fixture: ComponentFixture<ComponenteInicioSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteInicioSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteInicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
