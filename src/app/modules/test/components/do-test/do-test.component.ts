import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TestService, Test } from '../../services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
})
export class DoTestComponent implements OnInit {
  constructor(
    private testService: TestService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    // console.log(window.scrollY);
    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   console.log('inner: ', window.innerHeight);
    //   console.log('y: ', window.scrollY);
    //   console.log('offsetHeight: ', document.body.offsetHeight);
    // }
    const number = Math.ceil(window.scrollY / 240);
    console.log(number);
    this.testService
      .getOneQuestionInTest({
        shortId: window.location.href.slice(34),
        number: number,
      })
      .subscribe((res) => {
        console.log(res);
      });
  }

  test: Test | any;
  isFinished: boolean = false;
  showModal: boolean = false;
  score: number = 0;
  showModalConfirm: boolean = false;

  userForm: FormGroup = this.fb.group({
    info: [''],
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
  receiveInfo(value: any) {
    this.userForm.controls.info.setValue(value.infos);
    this.showModal = true;
  }
  submitAnswers() {
    // this.testService
    //   .submitTest(Object.assign({ testId: this.test._id }, this.userForm.value))
    //   .subscribe((res) => {
    //     if (res.data) this.score = res.data;
    //     this.isFinished = true;
    //   });
    this.showModalConfirm = true;
  }
  onSubmit() {
    this.submitAnswers();
  }
  finishTest(e: any) {
    if (e === false) this.showModalConfirm = false;
    else {
      this.score = e;
      this.isFinished = true;
    }
  }
  onChoseAnswer(answer: any, i: any, type: any): void {
    if (type === 'checkbox' || this.answers.at(i).value.length === 0) {
      if (this.answers.at(i).value.indexOf(answer) === -1)
        this.answers.at(i).value.push(answer);
      else {
        const index = this.answers.at(i).value.indexOf(answer);
        this.answers
          .at(i)
          .setValue([
            ...this.answers.at(i).value.slice(0, index),
            ...this.answers.at(i).value.slice(index + 1),
          ]);
      }
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

        for (let i = 0; i < this.test.requireInfo.length; i++) {
          let require = this.test.requireInfo[i];
          if (require.option) {
            require.option = require.option
              .split(',')
              .map((o: any) => o.trim());
          }
        }
        console.log(this.test);
      });
  }
}
