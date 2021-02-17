import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';

import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-search-bank',
  templateUrl: './search-bank.component.html',
  styleUrls: ['./search-bank.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class SearchBankComponent implements OnInit {
  @Output() eventSearchResults = new EventEmitter<any>();
  subject = new Subject();

  results: any = [];
  pages: number = 0;

  expanded: boolean = false;
  isSearched: boolean = false;

  constructor(private bankService: BankService, private router: Router) {}

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        // console.log(value);
        if (value)
          return this.bankService.searchBankByName(value).subscribe((res) => {
            this.results = res.data;
            this.pages = res.pages;
            this.eventSearchResults.emit({results: this.results, pages: this.pages, isSearched: true, content: value});
          });
        else {
          this.eventSearchResults.emit({results: [], pages: 0, isSearched: false, content: value});
          return (this.results = []);
        }
      });
  }
  onClick(e: any) {
    // console.log(e.target);
    if (e) {
      this.expanded = true;
    } else this.expanded = false;
  }
  focus(event: any) {
    // console.log(event);
    this.expanded = true;
    this.subject.next(event.target.value);
  }
  search(event: any) {
    this.expanded = true;
    this.isSearched = true;
    this.subject.next(event.target.value);
  }
  changeStateInput(isExpanded: boolean) {
    console.log(isExpanded);
    this.expanded = isExpanded;
  }
  goToDetail(id: any) {
    this.expanded = true;
    console.log(id);
    this.router.navigate([`/bank/view/${id}`]);
  }
}
