import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute
  ) {}

  currentPage: any;
  listResults: any = [];
  numberOfResults: any;
  pages: any;
  fetchedTest: boolean = false;
  listTests: any = [];

  ngOnInit(): void {
    this.getPage();
    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    this.resultService.getResultsDataStore().subscribe((res) => {
      console.log(res);
      if (res.length == 0 && !this.fetchedTest) {
        this.fetchedTest = true;

        this.getResultsByIdUser(this.currentPage);
      }
      if (res.length > 0) {
        this.listResults = res;
        this.fetchedTest = true;
      }
    });
  }
  getPage() {
    this.resultService.getPage().subscribe((res) => {
      this.numberOfResults = res.number;
      this.pages = res.data;
    });
  }
  getResultsByIdUser(page: any): void {
    this.currentPage = page;
    // this.listTests = [];

    this.resultService.getResultsByIdUserStore(page);
  }
  changeStateFetchedTest(test: any) {
    this.listTests.push(test);
    if (this.listTests.length === this.listResults.length) {
      // console.log(this.listTests);
      this.fetchedTest = true;
    }
  }
}
