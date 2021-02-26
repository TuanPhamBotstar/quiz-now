import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { BankService } from '../../services/bank.service';


@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css']
})
export class SearchQuestionComponent implements OnInit {
  @Output() eventSearchQuestions = new EventEmitter<any>();
  subject = new Subject();

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
    this.subject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value:any) => {
      if (value)
        return this.bankService.searchQuestionByName(value).subscribe(res => {
          this.eventSearchQuestions.emit(res.data);
        })
      return this.eventSearchQuestions.emit([])
    })
  }
  search(event: any) {
    this.subject.next(event.target.value);
  }
}
