import { TestBed } from '@angular/core/testing';

import { NodeSnackbarService } from './node-snackbar.service';

describe('NodeSnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeSnackbarService = TestBed.get(NodeSnackbarService);
    expect(service).toBeTruthy();
  });
});
