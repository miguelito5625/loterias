import { TestBed } from '@angular/core/testing';

import { NumerosDiariaService } from './numeros-diaria.service';

describe('NumerosDiariaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumerosDiariaService = TestBed.get(NumerosDiariaService);
    expect(service).toBeTruthy();
  });
});
