import { TestBed } from '@angular/core/testing';

import { CarritoDeComprasService } from './carrito-de-compras.service';

describe('CarritoDeComprasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarritoDeComprasService = TestBed.get(CarritoDeComprasService);
    expect(service).toBeTruthy();
  });
});
