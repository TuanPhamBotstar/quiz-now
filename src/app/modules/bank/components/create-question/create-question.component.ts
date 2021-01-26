import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  @Output() newAnswersEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  finishAddQuestion: boolean = false;

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
    this.finishAddQuestion = false;
    this.answers.push(
      this.fb.group({
        title: [''],
        isTrue: false,
      })
    );
  }
  onSubmit() {
    for (let answer of this.answers.value) {
      if (answer.isTrue) {
        this.finishAddQuestion = true;
        break;
      }
    }
    if (this.finishAddQuestion)
      this.newAnswersEvent.emit(this.questionForm.value);
    else alert('Please choose correct answer')
  }
}
