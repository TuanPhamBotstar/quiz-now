import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  @Output() newAnswersEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private toastManagementService: ToastManagementService
  ) {}

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.answers.push(
        this.fb.group({
          title: [''],
          isTrue: false,
        })
      );
    }
  }

  hideButton: boolean = false;

  questionForm: FormGroup = this.fb.group({
    answers: new FormArray([]),
  });

  get questionFormControls() {
    return this.questionForm.controls;
  }

  get answers() {
    return this.questionFormControls.answers as FormArray;
  }

  get answersFormGroup() {
    return this.answers.controls as FormGroup[];
  }

  addAnswer() {
    this.answers.push(
      this.fb.group({
        title: [''],
        isTrue: false,
      })
    );
  }
  removeAnswer(index: any, e: any) {
    this.answers.removeAt(index);

    e.stopPropagation();
  }
  onSubmit() {
    let flag = false;

    for (let answer of this.answers.value) {
      if (!answer.title) {
        this.toastManagementService.show('Invalid question', {
          classname: 'bg-danger text-light',
          delay: 2000,
        });
        return;
      }
    }
    for (let answer of this.answers.value) {
      if (answer.isTrue) {
        flag = true;
        break;
      }
    }
    if (flag) {
      this.newAnswersEvent.emit(this.questionForm.value);
      this.toastManagementService.show('Question is added', {
        classname: 'bg-success text-light',
        delay: 2000,
      });
      this.hideButton = true;
    } else alert('Please choose correct answer');
  }
}
