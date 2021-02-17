import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ResultService } from '../../services/result.service';
import { TestService } from 'src/app/modules/test/services/test.service';
import { Result } from 'src/app/modules/bank/models/result';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  currentPage: any = '1';
  listResults: any = [];
  listTests: any = [];

  fetchedTest: boolean = false;

  pages: any = 0;

  isFetched: boolean = false;
  flag = false;

  ngOnInit(): void {
    this.getPage();

    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    if (this.currentPage === '1') {
      this.router.navigate(['/result'], { queryParams: { page: '1' } });
    }

    this.resultService.getResultsDataStore().subscribe((res) => {
      console.log(res);
      if (res.length == 0) {
        this.getResultsByIdUser(this.currentPage);
      }
      this.listResults = res;
    });
  }
  getPage() {
    this.resultService.getPage().subscribe((res) => {
      this.pages = res.data;
    });
  }
  getResultsByIdUser(page: any) {
    this.currentPage = page;
    this.fetchedTest = false;
    this.listTests = [];
    this.resultService.getResultsByIdUserStore(page);
  }
  changeStateFetchedTest(test: any) {
    this.listTests.push(test);
    if (this.listTests.length === this.listResults.length) {
      console.log(this.listTests);
      this.fetchedTest = true;
    }
  }
  goToResult(id: any) {
    this.router.navigate([`result/${id}`]);
  }
}
