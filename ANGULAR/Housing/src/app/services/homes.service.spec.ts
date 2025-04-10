import { TestBed } from '@angular/core/testing';

import { HomesService } from './homes.service';

describe('HomesService', () => {
  let service: HomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
