import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankService } from 'src/app/modules/bank/services/bank.service';
import { TestService } from 'src/app/modules/test/services/test.service';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-with-user-detail',
  templateUrl: './result-with-user-detail.component.html',
  styleUrls: ['./result-with-user-detail.component.css'],
})
export class ResultWithUserDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bankService: BankService,
    private resultService: ResultService,
    private testService: TestService
  ) {}

  isFetched: boolean = false;
  
  idBank: string = '';
  idTest: string = '';
  idUser: string = '';

  bankTitle: string = '';
  testTitle: string = '';

  test: any;
  result: any;

  rightAnswers: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      console.log(res);
      this.idBank = res.idBank;
      this.idTest = res.idTest;
      this.idUser = res.idUser;

      this.test = res.test;
    });

    if (history.state.bankTitle) {
      this.bankTitle = history.state.bankTitle;
      this.testTitle = history.state.testTitle;
    } else {
      this.bankService.getBankInfoStore(this.idBank).subscribe((res) => {
        console.log(res);
        if (res) this.bankTitle = res.title;
      });
    }
    this.getTestInfo();
    this.getResult();
  }

  getTestInfo() {
    this.testService.getDetailTestStore(this.idTest).subscribe((res) => {
      console.log(res);
      if (res) {
        this.test = res;
        this.testTitle = res.title;
      }
    });
  }
  getResult() {
    this.resultService
      .getResultsByIdTestAndIdUser({ idTest: this.idTest, idUser: this.idUser })
      .subscribe((res) => {
        console.log(res);
        this.result = res.data[0];

        this.rightAnswers = this.result.userAnswers.filter((r: any) => r.isTrue).length 
        
        this.isFetched = true;
      });
  }
}
