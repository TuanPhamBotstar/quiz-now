import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultBarChartComponent } from './test-result-bar-chart.component';

describe('TestResultBarChartComponent', () => {
  let component: TestResultBarChartComponent;
  let fixture: ComponentFixture<TestResultBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
