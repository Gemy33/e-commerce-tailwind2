import { TestBed } from '@angular/core/testing';

import { CartSerService } from './cart-ser.service';

describe('CartSerService', () => {
  let service: CartSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
