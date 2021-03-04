import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { BankService } from 'src/app/modules/bank/services/bank.service';
import { TestService } from 'src/app/modules/test/services/test.service';
import { couldStartTrivia, textChangeRangeIsUnchanged } from 'typescript';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-with-user',
  templateUrl: './result-with-user.component.html',
  styleUrls: ['./result-with-user.component.css'],
})
export class ResultWithUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private testService: TestService,
    private resultService: ResultService
  ) {
    this.getInfos();
  }

  isFetched: boolean = false;

  idBank: string = '';
  idTest: string = '';

  bankTitle: string = '';
  testTitle: string = '';

  test: any;

  results: any = [];

  pages: number = 0;

  currentPage: string = '1';

  ngOnInit(): void {
    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';
  }

  getInfos() {
    this.route.params.subscribe((params) => {
      this.idBank = params.idBank;
      this.idTest = params.idTest;

      this.getResults();
    });

    if (history.state.bankTitle) {
      this.bankTitle = history.state.bankTitle;
      this.testTitle = history.state.testTitle;
    } else {
      this.bankService.getBankInfoStore(this.idBank).subscribe((res) => {
        if (res) this.bankTitle = res.title;
      });
      this.testService.getDetailTestStore(this.idTest).subscribe((res) => {
        if (res) {
          this.testTitle = res.title;
        }
      });
    }
  }
  getResults(page: any = 1, limitItems: any = 8) {
    this.currentPage = page + '';

    this.resultService
      .getResultsByIdTestAndPage({
        id: this.idTest,
        page: page || 1,
        limitItems: limitItems || 10,
      })
      .subscribe((res) => {
        this.results = res.data;
        console.log(this.results);
        this.pages = res.pages;

        this.isFetched = true;
      });
  }
  convertNumber(n: number) {
    if (n < 10) return '0' + n;

    return n;
  }
}
