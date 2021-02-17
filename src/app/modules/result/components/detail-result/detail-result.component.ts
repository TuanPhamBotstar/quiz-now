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
                this.result = res.data;
                this.getTest(this.result.idTest)
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

      // for (let i = 0; i < this.result.userAnswers.length; i++) {
      //   if (this.result.userAnswers[i].length > 1) {
      //     let flag = true;
      //     let count = 0;
      //     for (let j = 0; j < this.result.userAnswers[i].length; j++) {
      //       if (
      //         this.test.questions[i].answers[j].title.indexOf(
      //           this.result.userAnswers[i][j]
      //         ) != -1 &&
      //         this.test.questions[i].answers[j].isTrue
      //       ) {
      //         flag = false;
      //         break;
      //       }
      //     }
      //     if (count === this.result.userAnswers[i].length) {
      //       this.rightAnswers.push(true);
      //     } else this.rightAnswers.push(false);
      //   } else if (
      //     this.result.userAnswers[i][0] ===
      //       this.test.questions[i].answers[0].title &&
      //     this.test.questions.answers[i].isTrue
      //   ) {
      //     this.rightAnswers.push(true);
      //   } else this.rightAnswers.push(false);
      // }

      // console.log(this.rightAnswers);
    });
  }
}
