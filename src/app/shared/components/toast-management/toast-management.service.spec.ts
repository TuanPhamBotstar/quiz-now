import { TestBed } from '@angular/core/testing';

import { ToastManagementService } from './toast-management.service';

describe('ToastManagementService', () => {
  let service: ToastManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
