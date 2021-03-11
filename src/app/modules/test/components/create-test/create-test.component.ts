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

  isAdded: boolean = false;

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
    console.log('value: ', selectedValues);
    if (true) {
      this.customSlider();

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
    // console.log('e: ', e);
    this.isAdjusted = false;
    this.totalQuestions = e[0];
    // console.log(this.isAdjusted)
  }
  customSlider() {
    var fillerClass = document.querySelector(
      'body > app-root > div > div > app-create-test > div > div > form > div > div.test-info > npn-slider > div > div.bar > div'
    );
    var tmp = document.querySelector(
      'body > app-root > div > div > app-create-test > div > div > form > div > div.test-info > npn-slider > div > div.bar > div > span:nth-child(2)'
    ) as HTMLElement;

    if (!this.isAdded) {
      var leftSide = document.createElement('span');
      var rightSide = document.createElement('span');

      fillerClass?.appendChild(leftSide);
      fillerClass?.appendChild(rightSide);

      this.isAdded = true;
    } else {
      let leftSide = document.querySelector(
        'body > app-root > div > div > app-create-test > div > div > form > div > div.test-info > npn-slider > div > div.bar > div > span:nth-child(3)'
      ) as HTMLElement;
      let rightSide = document.querySelector(
        'body > app-root > div > div > app-create-test > div > div > form > div > div.test-info > npn-slider > div > div.bar > div > span:nth-child(4)'
      ) as HTMLElement;

      const tmpStyleLeft = tmp?.style.left;
      const tmpStyleWidth = tmp?.style.width;

      let numberStyleLeft = tmpStyleLeft.slice(0, tmpStyleLeft.indexOf('%'));
      let numberStyleWidth = tmpStyleWidth.slice(0, tmpStyleWidth.indexOf('%'));

      let rightSideLeft = +numberStyleLeft + +numberStyleWidth;
      let rightSideWidth = 100 - +numberStyleLeft - +numberStyleWidth;

      const attribute: string = tmp?.getAttributeNames()[0] || '';
      leftSide.setAttribute(attribute, '');
      rightSide.setAttribute(attribute, '');

      rightSide.style.left = rightSideLeft + '%';
      rightSide.style.width = rightSideWidth + '%';
      rightSide.style.background = '#e64848';

      leftSide.style.left = '0';
      leftSide.style.width = tmpStyleLeft;
      leftSide.style.background = '#E7BF3A';
    }
    // console.log(tmp?.getAttribute('style'))
    // var attribute: string = tmp?.getAttributeNames()[0] || '';
    // leftSide.setAttribute(attribute, '');
    // // leftSide.classList.add('left-side-style');
    // leftSide.style.left = '0';
    // leftSide.style.width = tmpStyle;
    // leftSide.style.background = 'red';

    // // if (fillerClass) fillerClass.appendChild(leftSide);

    // if (true) {
    //   if (fillerClass) fillerClass.appendChild(leftSide);
    //   this.isAdded = true;
    // }
  }
}
