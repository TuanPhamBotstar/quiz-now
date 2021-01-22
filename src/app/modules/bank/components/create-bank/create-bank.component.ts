import { Component, OnInit, Input } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-create-bank',
  templateUrl: './create-bank.component.html',
  styleUrls: ['./create-bank.component.css'],
})
export class CreateBankComponent implements OnInit {
  constructor(private fb: FormBuilder, private bankService: BankService) {}

  bankLength: number = 0;

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

  addAnswers(event: any) {
    this.bankForm.value.questions[
      this.bankForm.value.questions.length - 1
    ].answers = event;
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
    this.bankService.createBank(this.bankForm.value);

    console.log(this.bankForm.value);
  }
  ngOnInit(): void {}
}
