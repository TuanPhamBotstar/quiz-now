import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastManagementComponent } from './toast-management.component';

describe('ToastManagementComponent', () => {
  let component: ToastManagementComponent;
  let fixture: ComponentFixture<ToastManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
