import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BankService, Bank } from 'src/app/modules/bank/services/bank.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit {
  bankId: string = '';
  bank: Bank | any;

  constructor(
    private bankService: BankService,
    private fb: FormBuilder,
    private testService: TestService
  ) {
    this.bankId = window.location.href.slice(32, 32 + 24);
    console.log(this.bankId);
  }
  testForm: FormGroup = this.fb.group({
    title: [''],
    code: [''],
    time: [''],
    requireInfo: this.fb.array([]),
    knowTheResult: false,
    numberOfEasyQuestions: 0,
    numberOfNormalQuestions: 0,
    numberOfHardQuestions: 0,
  });
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
    this.infos.push(this.fb.group({
      info: [''],
      type: [''],
      option: ['']
    }))
  }
  getBank() {
    this.bankService.getBankInfo(this.bankId).subscribe((res) => {
      this.bank = res.data;

      console.log(this.bank);
    });
  }
  onSubmit() {  
    console.log(this.testForm.value);

    this.testService
      .createTestStore(Object.assign({ source: this.bankId }, this.testForm.value))
  }
}
