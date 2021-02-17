import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() results: any = null;

  maxScore: number = 0;
  public barChartOptions: ChartOptions | any;

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Users' }];
  public barChartColor: Color[] = [
    {
      backgroundColor: '#568fc7',
    },
  ];
  constructor() {}

  countUserScore: any = [];

  getLabels() {
    for (let result of this.results) {
      let score = (result.score * 10).toFixed(2).toString();
      if (this.barChartLabels.indexOf(score) == -1) {
        this.countUserScore[parseInt(score) * 100] = 1;
        console.log(this.countUserScore);
        this.barChartLabels.push(score);
      } else this.countUserScore[parseInt(score) * 100]++;
    }
    this.countUserScore = this.countUserScore.filter((res: any) => {
      return res != null;
    });
    console.log(this.countUserScore);
    for (let c of this.countUserScore) {
      if (this.barChartData[0].data) this.barChartData[0].data.push(c);
    }
    this.barChartLabels.sort(
      (a, b) => parseInt(a.toString()) - parseInt(b.toString())
    );
    console.log(this.barChartLabels);
  }
  ngOnInit(): void {
    console.log(this.results.length);
    this.getLabels();
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
}
