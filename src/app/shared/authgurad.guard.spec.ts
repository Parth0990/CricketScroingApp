import { TestBed } from '@angular/core/testing';

import { AuthguradGuard } from './authgurad.guard';

describe('AuthguradGuard', () => {
  let guard: AuthguradGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthguradGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
