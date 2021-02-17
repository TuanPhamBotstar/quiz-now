import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-view-question-detail',
  templateUrl: './view-question-detail.component.html',
  styleUrls: ['./view-question-detail.component.css'],
})
export class ViewQuestionDetailComponent implements OnInit {
  constructor(private bankService: BankService, private fb: FormBuilder) {}

  questionId: string = '';

  reFetch: boolean = false;

  questionForm = this.fb.group({
    title: [''],
    level: [''],
    answers: this.fb.array([]),
  });

  isDeleted: boolean = false;

  ngOnInit(): void {
    this.getQuestion();
  }
  get answers() {
    return this.questionForm.controls.answers as FormArray;
  }
  get answersFormGroup() {
    return this.answers.controls as FormGroup[];
  }
  onSubmit() {
    if (this.isDeleted) this.questionForm.reset();
    this.bankService
      .updateQuestionStore(
        Object.assign({ _id: this.questionId }, this.questionForm.value)
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  deleteQuestion() {
    this.isDeleted = !this.isDeleted;
  }
  getQuestion() {
    this.questionId = window.location.href.slice(36, 36 + 24);

    this.bankService
      .getQuestion(this.questionId)
      // .pipe(filter((question) => question))
      // .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          res = res.data;
          this.questionForm.controls.title.setValue(res.title);
          this.questionForm.controls.level.setValue(res.level);

          for (let answer of res.answers) {
            this.answers.push(
              this.fb.group({
                title: answer.title,
                isTrue: answer.isTrue,
              })
            );
          }
        }

        console.log(this.questionForm.value);
      });
  }
}
