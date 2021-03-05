import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from '../../services/result.service';
import { TestService } from 'src/app/modules/test/services/test.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private router: Router,
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

  isInfoFetched: boolean = false;
  isResultsFetched: boolean = false;

  pages: any = 0;

  flag = false;

  ngOnInit(): void {
    this.resultService.getResultsAndAnalyze().subscribe((res) => {
      this.averageScore = res.data.aveScore;
      this.maxScore = res.data.maxScore * 10;
      this.minScore = res.data.minScore * 10;

      this.listScores = res.data.scores;
      if (this.listScores === 0) this.listScores = [];
      console.log(this.listScores);

      this.isInfoFetched= true;
    });

    this.getPage();

    this.element = document.getElementById('scrollId');

    this.resultService.getResultsDataStore().subscribe((res) => {

      if (res.length == 0 && !this.isResultsFetched) {
        this.getResultsByIdUser(this.currentPage);
        this.isResultsFetched = true;
      }
      if (res.length > 0) {
        this.listResults = res;
        let sum = 0;
        this.isResultsFetched = true;

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
    this.isResultsFetched = false;
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
