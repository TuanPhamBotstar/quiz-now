import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-test-result-bar-chart',
  templateUrl: './test-result-bar-chart.component.html',
  styleUrls: ['./test-result-bar-chart.component.css'],
})
export class TestResultBarChartComponent implements OnInit {
  @Input() results: any;
  @Input() test: any;

  constructor() {}
  questions = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartOptions | any;
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Users' }];

  ngOnInit(): void {
    console.log(this.results);
    console.log(this.test);

    this.questions = this.test.questions;

    for (let i = 1; i <= this.questions.length; i++) {
      this.barChartLabels.push(i.toString());
    }

    this.countRightAnswers();

    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: this.results && 0,
              stepSize: 1,
              max: this.results && this.results.length,
            },
          },
        ],
      },
    };
  }

  countRightAnswers() {
    for (let i = 0; i < this.questions.length; i++) {
      let count = 0;
      for (let result of this.results) {
        if (result.userAnswers[i].isTrue) count++;
      }
      if (this.barChartData[0].data) this.barChartData[0].data.push(count);
    }

    console.log(this.barChartData[0].data);
  }
}
