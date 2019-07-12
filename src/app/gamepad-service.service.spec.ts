import { TestBed } from '@angular/core/testing';

import { GamepadServiceService } from './gamepad-service.service';

describe('GamepadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamepadServiceService = TestBed.get(GamepadServiceService);
    expect(service).toBeTruthy();
  });
});
