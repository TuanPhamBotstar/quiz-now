import { Component, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';
import { TestService, Test } from '../../../test/services/test.service';

import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';

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
  isFetched: boolean = false;
  reFetch: boolean = false;
  flagEmpty: boolean = false;
  flagNonEmpty: boolean = false;

  constructor(
    private bankService: BankService,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastManagementService: ToastManagementService
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
  showToast(string: any, e: any) {
    this.toastManagementService.show(string, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
    e.stopPropagation();
  }
  goToTestDetail(id: any) {
    this.router.navigate([`/bank/view/${this.bankId}/tests/${id}`]);
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
      for (let bank of res) {
        if (bank._id === this.bankId) {
          this.bank = bank;
          console.log(this.bank);
          if (this.bank.idTests.length > 0) this.getAllTest(bank._id);
          else {
            this.isFetched = true;
          }
          break;
        }
      }
      if (!this.bank)
        this.bankService
          .getBankInfoStore(this.bankId)
          .pipe(filter((res) => res != null))
          .subscribe((res) => {
            this.bank = res;
            console.log(this.bank);
            if (this.bank) {
              if (this.bank.idTests.length > 0) this.getAllTest(this.bank._id);
              else {
                this.isFetched = true;
              }
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
          // console.log(result)
          // if (result.length > 0) return result[0].source == id;
          return result != [];
        })
      )
      .subscribe((res) => {
        if (res.length > 0) {
          this.listTest = res;
          this.isFetched = true;
        }
      });
  }
  goToCreateTest() {
    this.router.navigate([`/bank/view/${this.bankId}/create/test`]);
  }
  goToViewQuestions() {
    this.router.navigate([`/bank/view/${this.bankId}/questions`]);
  }
}
