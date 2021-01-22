import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TestService, Test } from '../../services/test.service';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
})
export class DoTestComponent implements OnInit {
  constructor(private testService: TestService, public fb: FormBuilder) {}

  test: Test | any;

  userForm: FormGroup = this.fb.group({
    answers: this.fb.array([]),
  });
  // userAnswers: FormArray = this.fb.array([]);

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
  onSubmit() {
    console.log(this.userForm.value);
  }
  onChoseAnswer(answer: any, i: any, type: any): void {
    if (type === 'checkbox' || this.answers.at(i).value.length === 0) {
      this.answers.at(i).value.push(answer);
    } else this.answers.at(i).value.map((res: any) => answer);

    console.log(this.answers.at(i));
  }
  getTestInfo() {
    this.testService
      .getDetailTest(window.location.href.slice(34))
      .subscribe((res) => {
        this.test = res.data;

        console.log(this.test.questions.length);

        for (let i = 0; i < this.test.questions.length; i++) {
          this.answers.push(this.fb.control([]));
        }
        // console.log(this.userFormControls.answers.controls);
        console.log(this.answers.at(this.answers.length - 1));

        console.log(this.test);
      });
  }
}
