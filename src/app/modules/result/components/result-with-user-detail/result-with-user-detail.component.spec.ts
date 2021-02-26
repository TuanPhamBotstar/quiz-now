import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWithUserDetailComponent } from './result-with-user-detail.component';

describe('ResultWithUserDetailComponent', () => {
  let component: ResultWithUserDetailComponent;
  let fixture: ComponentFixture<ResultWithUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultWithUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWithUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
