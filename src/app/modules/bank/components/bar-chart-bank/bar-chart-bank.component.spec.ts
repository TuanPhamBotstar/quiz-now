import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartBankComponent } from './bar-chart-bank.component';

describe('BarChartBankComponent', () => {
  let component: BarChartBankComponent;
  let fixture: ComponentFixture<BarChartBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
