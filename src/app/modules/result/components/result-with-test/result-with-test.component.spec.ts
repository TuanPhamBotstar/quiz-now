import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWithTestComponent } from './result-with-test.component';

describe('ResultWithTestComponent', () => {
  let component: ResultWithTestComponent;
  let fixture: ComponentFixture<ResultWithTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultWithTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWithTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
