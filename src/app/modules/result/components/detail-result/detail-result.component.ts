import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/modules/test/services/test.service';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.css'],
})
export class DetailResultComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private testService: TestService
  ) {}

  resultId: any;
  result: any = null;
  test: any;

  ngOnInit(): void {
    this.resultId = window.location.href.slice(29, 29 + 24);

    this.getDetailResult();
  }
  rightAnswers: boolean[] = [];

  getDetailResult() {
    this.resultService.getResults().subscribe((results) => {
      if (results) {
        for (let result of results) {
          if (result._id === this.resultId) {
            console.log(result)
            this.result = result;
            console.log(this.result);
            this.getTest(this.result.idTest);
            break;
          }
        }
        if (!this.result) {
          this.resultService
            .getResultsByIdResult(this.resultId)
            .subscribe((res) => {
              if (res) {
                console.log(res);
                this.result = res.data;
                this.getTest(this.result.idTest);
              }
            });
        }
      }
    });
  }
  getTest(id: any = this.resultId) {
    this.testService.getTestById(id).subscribe((res) => {
      this.test = res.data;
      console.log(this.test);
    });
  }
}
