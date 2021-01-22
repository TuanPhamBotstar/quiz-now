import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankDetailComponent } from './view-bank-detail.component';

describe('ViewBankDetailComponent', () => {
  let component: ViewBankDetailComponent;
  let fixture: ComponentFixture<ViewBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
