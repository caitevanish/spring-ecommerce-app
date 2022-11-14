import { TestBed } from '@angular/core/testing';

import { EcommerceFormService } from './e-commerce-form.service';

describe('EommerceFormService', () => {
  let service: EcommerceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
