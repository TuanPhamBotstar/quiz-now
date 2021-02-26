import { Component, OnInit, Input,} from '@angular/core';
import {Location} from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.css'],
})
export class CreateBankComponent implements OnInit {
  constructor(private fb: FormBuilder, private bankService: BankService, private _location: Location) {}

  bankLength: number = 0;
  finishAddQuestion: boolean = false;

  // titleForm = this.fb.control('');

  bankForm: FormGroup = this.fb.group({
    title: [''],
    questions: new FormArray([]),
  });

  get bankFormControls() {
    return this.bankForm.controls;
  }

  get questions() {
    return this.bankFormControls.questions as FormArray;
  }

  get questionsFormGroup() {
    return this.questions.controls as FormGroup[];
  }

  addAnswers(event: any, i: any) {
    console.log(i)
    console.log(event);

    this.bankForm.value.questions[i].answers = event;
  }

  addQuestion() {
    this.bankLength++;
    this.questions.push(
      this.fb.group({
        title: [''],
        answers: new FormArray([]),
        level: ['easy'],
      })
    );
  }
  onSubmit() {
    this.bankService.createBankStore(this.bankForm.value);

    this._location.back();
    console.log(this.bankForm.value);
  }
  ngOnInit(): void {}
}
