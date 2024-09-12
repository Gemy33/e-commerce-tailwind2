import { TestBed } from '@angular/core/testing';


describe('CatagoryService', () => {
  let service: CatagoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatagoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
