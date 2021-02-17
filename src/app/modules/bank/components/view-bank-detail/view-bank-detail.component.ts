import { Component, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';
import { TestService, Test } from '../../../test/services/test.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-view-bank-detail',
  templateUrl: './view-bank-detail.component.html',
  styleUrls: ['./view-bank-detail.component.css'],
})
export class ViewBankDetailComponent implements OnInit {
  bankId: string = '';

  bank: Bank | any = null;
  listTest: Test[] | any = [];
  pages: number = 0;
  currentPage: string = '1';
  showModalDelete: boolean = false;

  reFetch: boolean = false;
  flagEmpty: boolean = false;
  flagNonEmpty: boolean = false;

  constructor(
    private bankService: BankService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.bankId = this.router.url.slice(11, 35);

    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    this.getBank();

    this.testService.getPage(this.bankId).subscribe((res) => {
      console.log(res);
      this.pages = res.data;
    });
  }
  goToTestDetail(id: any) {
    this.router.navigate([`/bank/view/${this.bankId}/test/${id}`]);
  }
  openModal() {
    this.showModalDelete = true;
  }
  deleteBank(id: any) {
    console.log(id);
    if (id) {
      this.bankService.deleteBankStore(id);
      this._location.back();
    } else this.showModalDelete = false;
  }
  getBankId() {
    this.bankService.getOneBankDataStore().subscribe((res) => {
      console.log(res);
      if (res) this.bankId = res._id;
      else this.bankId = this.router.url.slice(11, 35);
    });
  }
  getBank() {
    this.bankService.getBanksDataStore().subscribe((res) => {
      console.log(res);
      for (let bank of res) {
        if (bank._id === this.bankId) {
          this.bank = bank;
          console.log(this.bank);
          if (this.bank.idTests.length > 0) this.getAllTest(bank._id);
          break;
        }
      }
      if (!this.bank)
        this.bankService.getBankInfoStore(this.bankId).subscribe((res) => {
          this.bank = res;
          console.log(this.bank);
          if (this.bank) {
            if (this.bank.idTests.length > 0) this.getAllTest(this.bank._id);
          }
        });
    });
  }
  getTestByBank(page: any) {
    this.currentPage = page;
    this.testService.getAllTestStore(this.bankId, page);
  }
  getAllTest(id: any) {
    this.testService.getAllTestStore(id, parseInt(this.currentPage));

    this.testService
      .getAllTestDataStore()
      .pipe(
        filter((result) => {
          console.log(result)
          // if (result.length > 0) return result[0].source == id;
          return result != null;
        })
      )
      .subscribe((res) => {
        this.listTest = res;
      });
  }
  goToCreateTest() {
    this.router.navigate([`/bank/view/${this.bankId}/create/test`]);
  }
  goToViewQuestions() {
    this.router.navigate([`/bank/view/${this.bankId}/questions`]);
  }
}
