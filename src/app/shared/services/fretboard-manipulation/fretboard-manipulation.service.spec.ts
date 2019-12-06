import { TestBed } from '@angular/core/testing';

import { FretboardManipulationService } from './fretboard-manipulation.service';

describe('FretboardManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FretboardManipulationService = TestBed.get(FretboardManipulationService);
    expect(service).toBeTruthy();
  });
});
