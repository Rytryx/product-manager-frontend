import { TestBed } from '@angular/core/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';

// Test suite for AuthorizationInterceptor
describe('AuthorizationInterceptor', () => {
  // Set up TestBed before each test
  beforeEach(() => TestBed.configureTestingModule({
    // Provide the AuthorizationInterceptor for testing
    providers: [AuthorizationInterceptor]
  }));

  // Test case: should verify that the interceptor is successfully created
  it('should be created', () => {
    // Injecting the AuthorizationInterceptor
    const interceptor: AuthorizationInterceptor = TestBed.inject(AuthorizationInterceptor);
    // Assertion to check if the interceptor is truthy (exists and is initialized)
    expect(interceptor).toBeTruthy();
  });
});
