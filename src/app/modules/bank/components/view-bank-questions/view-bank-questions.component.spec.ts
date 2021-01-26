import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankQuestionsComponent } from './view-bank-questions.component';

describe('ViewBankQuestionsComponent', () => {
  let component: ViewBankQuestionsComponent;
  let fixture: ComponentFixture<ViewBankQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBankQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
