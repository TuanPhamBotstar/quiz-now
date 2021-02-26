import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWithUserComponent } from './result-with-user.component';

describe('ResultWithUserComponent', () => {
  let component: ResultWithUserComponent;
  let fixture: ComponentFixture<ResultWithUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultWithUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWithUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
