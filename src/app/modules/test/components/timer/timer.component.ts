import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input() time: string | any;
  @Output() finishedEvent = new EventEmitter<string>();

  myCount: any;

  ngDoCheck() {
    if (this.time == '0') {
      clearInterval(this.myCount);
      this.finishedEvent.emit('finished');
    }
  }

  countDown() {
    this.myCount = setInterval(() => {
      this.time = parseInt(this.time) - 1;
    }, 1000)
  }
  constructor() {}  

  ngOnInit(): void {
    this.countDown();
  }
}
