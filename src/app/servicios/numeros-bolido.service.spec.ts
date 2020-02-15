import { TestBed } from '@angular/core/testing';

import { NumerosBolidoService } from './numeros-bolido.service';

describe('NumerosBolidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumerosBolidoService = TestBed.get(NumerosBolidoService);
    expect(service).toBeTruthy();
  });
});
