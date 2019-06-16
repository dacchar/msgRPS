import { TestBed } from '@angular/core/testing';

import { RpsServiceService } from './rps-service.service';

describe('RpsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RpsServiceService = TestBed.get(RpsServiceService);
    expect(service).toBeTruthy();
  });
});
