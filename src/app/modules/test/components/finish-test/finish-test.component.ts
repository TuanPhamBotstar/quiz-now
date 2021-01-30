import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-finish-test',
  templateUrl: './finish-test.component.html',
  styleUrls: ['./finish-test.component.css']
})
export class FinishTestComponent implements OnInit {
  @Input() test: any;
  @Input() score: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.test, this.score)
  }

}
