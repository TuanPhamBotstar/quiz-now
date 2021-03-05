import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-view-test-questions',
  templateUrl: './view-test-questions.component.html',
  styleUrls: ['./view-test-questions.component.css'],
})
export class ViewTestQuestionsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private testService: TestService) {
    route.params.subscribe(params => {
      this.bankId = params.idBank;
      this.testId = params.id;
    })
  }

  bankId: any;
  testId: any;

  ngOnInit(): void {
    this.getTest()
  }

  getTest() {
    this.testService.getDetailTestStore(this.testId).subscribe(res => {
      console.log(res)
    })
  }
}
