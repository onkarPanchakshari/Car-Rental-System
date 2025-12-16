import { TestBed } from '@angular/core/testing';

import { AuthProductionService } from './auth.production.service';

describe('AuthProductionService', () => {
  let service: AuthProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
