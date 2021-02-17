import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService, Bank } from 'src/app/modules/bank/services/bank.service';
import { TestService } from '../../services/test.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit {
  bankId: string = '';
  bank: Bank | any;

  totalQuestions: number = 0;
  isAdjusted: boolean = false;

  easyQuestions: number = 0;
  normalQuestions: number = 0;
  hardQuestions: number = 0;

  submitted: boolean = false;

  constructor(
    private bankService: BankService,
    private fb: FormBuilder,
    private testService: TestService,
    private _location: Location
  ) {
    this.bankId = window.location.href.slice(32, 32 + 24);
    console.log(this.bankId);
  }
  testForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    code: [''],
    time: [''],
    requireInfo: this.fb.array([]),
    knowTheResult: false,
    numberOfEasyQuestions: 0,
    numberOfNormalQuestions: 0,
    numberOfHardQuestions: 0,
  });
  get testFormControl() {
    return this.testForm.controls;
  }
  ngOnInit(): void {
    this.getBank();
  }

  get infos() {
    return this.testForm.controls.requireInfo as FormArray;
  }
  get infosFormGroup() {
    return this.infos.controls as FormGroup[];
  }

  addInfo() {
    this.infos.push(
      this.fb.group({
        info: [''],
        type: [''],
        option: [''],
      })
    );
  }
  getBank() {
    this.bankService.getBankInfo(this.bankId).subscribe((res) => {
      this.bank = res.data;

      console.log(this.bank);
    });
  }
  onSubmit() {
    this.submitted = true;
    if (
      this.testForm.value.numberOfEasyQuestions >
        this.bank.numberOfEasyQuestions ||
      this.testForm.value.numberOfNormalQuestions >
        this.bank.numberOfNormalQuestions ||
      this.testForm.value.numberOfHardQuestions >
        this.bank.numberOfHardQuestions
    ) {
      alert('Reach out the limit');
    } else {
      if (!this.testForm.value.time) this.testForm.value.time = '1';
      console.log('ok');
      this.testService.createTestStore(
        Object.assign({ source: this.bankId }, this.testForm.value)
      );
      this._location.back();
    }
  }
  onSliderChange(selectedValues: number[]) {
    // this._currentValues = selectedValues;
    // this.isAdjusted = true;
    console.log("value: ",selectedValues);
    if (true) {
      this.testFormControl.numberOfEasyQuestions.setValue(
        selectedValues[0] - 0
      );
      this.testFormControl.numberOfNormalQuestions.setValue(
        selectedValues[1] - selectedValues[0]
      );
      this.testFormControl.numberOfHardQuestions.setValue(
        this.totalQuestions - selectedValues[1]
      );

      this.easyQuestions = this.testFormControl.numberOfEasyQuestions.value;
      this.normalQuestions = this.testFormControl.numberOfNormalQuestions.value;
      this.hardQuestions = this.testFormControl.numberOfHardQuestions.value;
    }
    // console.log(this.isAdjusted)

  }
  onChangeInput(e: any) {
    console.log("e: ",e)
    this.isAdjusted = false;
    this.totalQuestions = e[0];
    // console.log(this.isAdjusted)
  }
}
