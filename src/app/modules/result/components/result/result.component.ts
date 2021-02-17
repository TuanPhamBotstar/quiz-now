import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from 'src/app/modules/test/services/test.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  @Input() result: any;
  @Input() i: any;
  @Output() fetched = new EventEmitter<any>();
  
  constructor(private testService: TestService, private router: Router) {}
  test: any;

  isFetched: boolean = false;

  ngOnInit(): void {
    this.getTestById();
  }
  goToResult(id: any) {
    this.router.navigate([`result/${id}`]);
  }
  getTestById() {
    this.testService.getTestById(this.result.idTest).subscribe((res) => {
      if (res) {
        res = res.data;
        this.test = res;
        this.isFetched = true;
        this.fetched.emit(this.test)
      }
    });
  }
}
