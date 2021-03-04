import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() eventChangeBar = new EventEmitter<boolean>();

  constructor(
    private resultService: ResultService,
    private location: Location,
    private testService: TestService,
    private router: Router,
    private route: ActivatedRoute,
    private bankService: BankService
  ) {
    this.idBank = this.route.snapshot.paramMap.get('idBank') + '';
    this.idTest = this.route.snapshot.paramMap.get('id') + '';
  }

  randomNumber1: any = (Math.random() * 10).toFixed(2);
  randomNumber2: any = (Math.random() * 10).toFixed(2);
  averageScore: any;

  isFetched: boolean = false;
  time: number = 7;

  userNames: string[] = [];
  scores: any[] = [];

  shouldShow: boolean = false;

  idBank: string = '';
  bank: any;

  idTest: string = '';
  test: any;

  totalResults: number = 0;
  listResults: any = [];

  infoSelected: string = '1w';

  ngOnInit(): void {
    this.eventChangeBar.emit(true);

    this.getTest();
    this.getBank();

    this.getAllResultsByIdTest();
  }
  getAllResultsByIdTest(time = 7) {
    this.time = time;

    this.scores = [];
    this.userNames = [];

    switch (time) {
      case 7:
        this.infoSelected = '1w';
        break;
      case 30:
        this.infoSelected = '1m';
        break;
      case 0:
        this.infoSelected = '0';
        break;
      default:
        this.infoSelected = '1d';
        break;
    }

    const firstFetched = this.resultService
      .getResultsByIdTest({ id: this.idTest, time: time })
      .subscribe((res) => {
        console.log(res);
        this.totalResults = res.totalResults;
        this.listResults = res.data;

        console.log(this.listResults);

        for (let result of this.listResults) {
          this.scores.push(result.score);
          this.userNames.push(result.user);
        }

        firstFetched.unsubscribe();

        if (this.scores.length > 0) {
          this.averageScore =
            +(
              this.scores.reduce((a, b) => a + b, 0) / this.scores.length
            ).toFixed(2) * 10;
          this.averageScore = this.averageScore.toFixed(2);
        } else this.averageScore = 0;

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
