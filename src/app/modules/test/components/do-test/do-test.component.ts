import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TestService, Test } from '../../services/test.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
})
export class DoTestComponent implements OnInit {
  constructor(private testService: TestService, public fb: FormBuilder, private router: Router) {}

  test: Test | any;
  isFinished: boolean = false;

  userForm: FormGroup = this.fb.group({
    answers: this.fb.array([]),
  });
  scroll(id: any) {
    let el = document.getElementById(id);

    el &&
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  }
  get userFormControls() {
    return this.userForm.controls;
  }
  get answers() {
    return this.userFormControls.answers as FormArray;
  }
  get answersFormGroup() {
    return this.answers.controls as FormGroup[];
  }

  ngOnInit(): void {
    this.getTestInfo();
  }
  submitAnswers() {
    console.log(this.userForm.value)
    this.testService
      .submitTest(Object.assign({ testId: this.test._id }, this.userForm.value))
      .subscribe((res) => {
        console.log(res);
        this.isFinished = true;
      });
  }
  onSubmit() {
    this.submitAnswers();
  }

  onChoseAnswer(answer: any, i: any, type: any): void {
    if (type === 'checkbox' || this.answers.at(i).value.length === 0) {
      this.answers.at(i).value.push(answer);
      this.saveStateAnswer[i] = true;
    } else {
      this.saveStateAnswer[i] = true;
      this.answers.at(i).value.pop();
      this.answers.at(i).value.push(answer);
    }
  }
  saveStateAnswer: boolean[] = [];

  getTestInfo() {
    this.testService
      .getDetailTest(window.location.href.slice(34))
      .subscribe((res) => {
        this.test = res.data;

        for (let i = 0; i < this.test.questions.length; i++) {
          this.answers.push(this.fb.control([]));
          this.saveStateAnswer.push(false);
        }

        console.log(this.test)
      });
  }
}
