import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    requiredName: false,
    requiredMsv: false,
    knowTheResult: false,
    numberOfEasyQuestions: 0,
    numberOfNormalQuestions: 0,
    numberOfHardQuestions: 0,
  });
  ngOnInit(): void {
    this.getBank();
  }

  getBank() {
    this.bankService.getBankInfo(this.bankId).subscribe((res) => {
      this.bank = res.data;

      console.log(this.bank);
    });
  }
  onSubmit() {
    console.log('hello');
    this.testService
      .createTest(Object.assign({ source: this.bankId }, this.testForm.value))
      .subscribe((res) => {
        console.log(res);
      });
    // console.log(this.testForm.value);
  }
}
