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

  param: string = '';

  ngOnChanges(changes: any) {
    // console.log(changes)
    // this.currentPage = changes.currentValue.toString();
    // console.log(this.currentPage)
    if (this.pageNumber > this.pages[this.pages.length - 1]) this.pages.push(this.pageNumber);
    // console.log(this.pages.indexOf(this.currentPage))
  }
  ngOnInit(): void {
    this.param = this.route.snapshot.queryParamMap.get('page') || '1';

    // console.log(this.currentPage);
    // console.log(this.param);
    for (let i = 1; i <= this.pageNumber; i++) {
      this.pages.push(i);
    }
    // console.log(this.pages);
  }
  goToPage(page: any) {
    this.param = this.route.snapshot.queryParamMap.get('page') || '1';
    
    if (page === 'Previous' && parseInt(this.param) - 1 >= 1) {
      this.router.navigate([this.goRoute], {
        queryParams: { page: parseInt(this.param) - 1 },
      });
      this.changePageEvent.emit((parseInt(this.param) - 1).toString());
    } else if (page === 'Next' && parseInt(this.param) + 1 <= this.pageNumber) {
      this.router.navigate([this.goRoute], {
        queryParams: { page: parseInt(this.param) + 1 },
      });
      this.changePageEvent.emit((parseInt(this.param) + 1).toString());
    } else if (page != 'Previous' && page != 'Next') {
      this.router.navigate([this.goRoute], { queryParams: { page: page } });
      this.changePageEvent.emit(page);
    }
  
  }
}
