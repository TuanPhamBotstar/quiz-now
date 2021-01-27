import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionDetailComponent } from './view-question-detail.component';

describe('ViewQuestionDetailComponent', () => {
  let component: ViewQuestionDetailComponent;
  let fixture: ComponentFixture<ViewQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
