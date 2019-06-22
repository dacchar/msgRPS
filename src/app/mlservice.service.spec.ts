import { TestBed } from '@angular/core/testing';

import { MLServiceService } from './mlservice.service';

describe('MLServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MLServiceService = TestBed.get(MLServiceService);
    expect(service).toBeTruthy();
  });
});
