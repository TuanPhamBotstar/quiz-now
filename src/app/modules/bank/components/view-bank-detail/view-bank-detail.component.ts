import { Component, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';
import {TestService, Test} from '../../../test/services/test.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bank-detail',
  templateUrl: './view-bank-detail.component.html',
  styleUrls: ['./view-bank-detail.component.css'],
})
export class ViewBankDetailComponent implements OnInit {
  bankId: string = '';

  bank: Bank | any;
  listTest: Test[] | any = [];

  constructor(
    private bankService: BankService,
    private testService: TestService,
    private router: Router
  ) {
    this.bankId = window.location.href.slice(32);
  }

  ngOnInit(): void {
    console.log(this.bankId);
    this.getBank();
    this.getAllTest();
  }

  getBank() {
    this.bankService.getBankInfo(this.bankId).subscribe((res) => {
      this.bank = res.data;

      console.log(this.bank);
    });
  }
  getAllTest() {
    this.testService.getAllTest().subscribe((res) => {
      this.listTest = res.data;
      console.log(res);
    })
  }
  goToCreateTest() {
    this.router.navigate([`/bank/view/${this.bankId}/create/test`]);
  }
}
