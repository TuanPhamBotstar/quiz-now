import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRequireComponent } from './modal-require.component';

describe('ModalRequireComponent', () => {
  let component: ModalRequireComponent;
  let fixture: ComponentFixture<ModalRequireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRequireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRequireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
