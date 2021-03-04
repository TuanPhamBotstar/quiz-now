import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    // console.log(window.scrollY);
  }

  averageScore: number = 0;
  minScore: number = 0;
  maxScore: number = 0;

  currentPage: any = '1';
  listResults: any = [];
  listTests: any = [];
  listScores: any = [];

  bestScore: number = 0;
  worstScore: number = 10;
  aveScore: number = 0;

  element: any;

  numberOfResults: number = 0;

  fetchedTest: boolean = false;

  pages: any = 0;

  isFetched: boolean = false;
  flag = false;

  ngOnInit(): void {
    this.resultService.getResultsAndAnalyze().subscribe((res) => {
      this.averageScore = res.data.aveScore;
      this.maxScore = res.data.maxScore * 10;
      this.minScore = res.data.minScore * 10;

      this.listScores = res.data.scores;
      console.log(this.listScores);
    });

    this.getPage();

    this.element = document.getElementById('scrollId');
    // console.log(this.element);

    // this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    // if (this.currentPage === '1') {
    //   this.router.navigate(['/result'], { queryParams: { page: '1' } });
    // }

    this.resultService.getResultsDataStore().subscribe((res) => {
      // this.element.scrollIntoView({ behavior: 'smooth' });

      if (res.length == 0) {
        this.getResultsByIdUser(this.currentPage);
        this.isFetched = true;
      }
      if (res.length > 0) {
        this.listResults = res;
        let sum = 0;
        this.isFetched = true;

        for (var result of this.listResults) {
          sum += result.score;
          if (result.score * 10 > this.bestScore)
            this.bestScore = result.score * 10;
          if (result.score * 10 < this.worstScore)
            this.worstScore = result.score * 10;
        }
        this.aveScore = sum / this.listResults.length;
      }
    });
  }
  getPage() {
    this.resultService.getPage().subscribe((res) => {
      this.numberOfResults = res.number;
      this.pages = res.data;
    });
  }
  getResultsByIdUser(page: any) {
    this.currentPage = page;
    this.fetchedTest = false;
    this.listTests = [];

    this.resultService.getResultsByIdUserStore(page);
  }
  // changeStateFetchedTest(test: any) {
  //   this.listTests.push(test);
  //   if (this.listTests.length === this.listResults.length) {
  //     // console.log(this.listTests);
  //     this.fetchedTest = true;
  //   }
  // }
  goToResult(id: any) {
    this.router.navigate([`result/${id}`]);
  }
}
