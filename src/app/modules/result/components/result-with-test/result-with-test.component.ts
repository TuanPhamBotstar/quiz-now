import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/modules/test/services/test.service';
import { ResultService } from '../../services/result.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BankService } from 'src/app/modules/bank/services/bank.service';

@Component({
  selector: 'app-result-with-test',
  templateUrl: './result-with-test.component.html',
  styleUrls: ['./result-with-test.component.css'],
})
export class ResultWithTestComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private location: Location,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private bankService: BankService
  ) {}

  randomNumber1: any = (Math.random() * 10).toFixed(2);
  randomNumber2: any = (Math.random() * 10).toFixed(2);
  averageScore: any;

  isFetched: boolean = false;

  userNames: string[] = [];
  scores: any[] = [];

  shouldShow: boolean = false;

  idBank: string = '';
  bank: any;

  idTest: string = '';
  test: any;

  totalResults: number = 0;
  listResults: any = [];

  ngOnInit(): void {
    this.idBank = location.pathname.slice(11, 35);
    this.idTest = location.pathname.slice(41, 65);

    this.getTest();
    this.getBank();

    this.getAllResultsByIdTest();
  }
  getAllResultsByIdTest(time = 7) {
    this.scores = [];
    this.userNames = [];

    const firstFetched = this.resultService
      .getResultsByIdTest({ id: this.idTest, time: time })
      .subscribe((res) => {
        console.log(res);
        this.totalResults = res.totalResults;
        this.listResults = res.data.sort((a: any, b: any) => b.score - a.score);

        console.log(this.listResults);

        for (let result of this.listResults) {
          // console.log(result.score);
          this.scores.push(result.score);
          this.resultService
            .getUserNameByIdUser(result.idUser)
            .subscribe((res) => {
              this.userNames.push(res.name);
            });
        }

        firstFetched.unsubscribe();

        this.averageScore =
          +(
            this.scores.reduce((a, b) => a + b, 0) / this.scores.length
          ).toFixed(2) * 10;
        this.averageScore = this.averageScore.toFixed(2);

        this.isFetched = true;
      });
  }

  getTest() {
    this.testService.getAllTestDataStore().subscribe((tests) => {
      if (tests.length > 0) {
        for (let test of tests) {
          if (test._id === this.idTest) this.test = test;
          break;
        }
      }
      if (!this.test)
        this.testService.getDetailTestStore(this.idTest).subscribe((res) => {
          this.test = res;
        });
    });
  }
  getBank() {
    this.bankService.getBanksDataStore().subscribe((banks) => {
      if (banks.length > 0) {
        for (let bank of banks) {
          if (bank._id === this.idBank) this.bank = bank;
          break;
        }
      }
      if (!this.bank)
        this.bankService.getBankInfoStore(this.idBank).subscribe((bank) => {
          this.bank = bank;
        });
    });
  }
}
