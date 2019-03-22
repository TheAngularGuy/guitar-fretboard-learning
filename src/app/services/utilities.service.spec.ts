import { TestBed } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilitiesService = TestBed.get(UtilitiesService);
    expect(service).toBeTruthy();
  });
});
