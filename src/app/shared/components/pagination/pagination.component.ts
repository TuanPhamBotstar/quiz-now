import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() pageNumber: number = 0;
  @Input() goRoute: string = '';
  @Input() currentPage: string = '1';

  @Output() changePageEvent = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  pages: any = [];
  pageItems: any = [];

  param: string = '';

  ngOnChanges(changes: any) {
    // if (+this.currentPage + 5 < this.pageNumber)
    //   this.pageItems = this.pages.slice(
    //     +this.currentPage - 1,
    //     +this.currentPage + 5
    //   );
    // else this.pageItems = this.pages;
    // console.log(this.pageItems);

    if (this.pageNumber > this.pages[this.pages.length - 1])
      this.pages.push(this.pageNumber);
    // console.log(this.pages.indexOf(this.currentPage))
  }
  ngOnInit(): void {
    this.param = this.route.snapshot.queryParamMap.get('page') || '1';

    for (let i = 1; i <= this.pageNumber; i++) {
      this.pages.push(i);
    }
    this.pageItems = this.optimizePagination(
      +this.currentPage,
      this.pageNumber
    );
  }
  optimizePagination(currentPage: number, pageNumber: number): any {
    if (pageNumber <= 5) return this.pages;
    if (currentPage + 4 >= pageNumber)
      return this.pages.slice(this.pages.length - 5);

    return [currentPage, '...', ...this.pages.slice(this.pages.length - 4)];
  }
  goToPage(page: any) {
    this.param = this.route.snapshot.queryParamMap.get('page') || '1';

    if (page === 'Previous' && parseInt(this.param) - 1 >= 1) {
      this.router.navigate([this.goRoute], {
        queryParams: { page: parseInt(this.param) - 1 },
      });
      this.pageItems = this.optimizePagination(
        +this.param - 1,
        this.pageNumber
      );
      this.changePageEvent.emit((parseInt(this.param) - 1).toString());
    } else if (page === 'Next' && parseInt(this.param) + 1 <= this.pageNumber) {
      this.router.navigate([this.goRoute], {
        queryParams: { page: parseInt(this.param) + 1 },
      });
      this.pageItems = this.optimizePagination(
        +this.param + 1,
        this.pageNumber
      );
      this.changePageEvent.emit((parseInt(this.param) + 1).toString());
    } else if (page != 'Previous' && page != 'Next' && page != '...') {
      console.log(page);
      this.router.navigate([this.goRoute], { queryParams: { page: page } });
      this.pageItems = this.optimizePagination(+page, this.pageNumber);
      this.changePageEvent.emit(page);
    }
  }
}
