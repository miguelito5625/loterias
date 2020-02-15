import { TestBed } from '@angular/core/testing';

import { JqueryConfirmService } from './jquery-confirm.service';

describe('JqueryConfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqueryConfirmService = TestBed.get(JqueryConfirmService);
    expect(service).toBeTruthy();
  });
});
