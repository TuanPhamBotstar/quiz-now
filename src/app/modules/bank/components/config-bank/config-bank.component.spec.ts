import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBankComponent } from './config-bank.component';

describe('ConfigBankComponent', () => {
  let component: ConfigBankComponent;
  let fixture: ComponentFixture<ConfigBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
