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
      score = (+score * 100).toFixed(2);
      // console.log(score);
      // console.log('-------');
      if (this.barChartLabels.indexOf(score) == -1) {
        // console.log(+score * 100)
        this.countUserScore[+score * 100] = 1;
        // console.log(this.countUserScore);
        console.log(score);
        this.barChartLabels.push(score);
        // console.log(+(+score * 100).toFixed(2));
      } else {
        this.countUserScore[+score * 100] =
          this.countUserScore[+score * 100] + 1;
        // console.log(this.countUserScore[+score * 100]);
        // console.log(+(+score * 100).toFixed(2));
      }
      console.log(this.barChartLabels);
    }
    console.log(this.countUserScore);

    this.countUserScore = this.countUserScore.filter((res: any) => {
      return res != null;
    });
    console.log(this.countUserScore);
    for (let c of this.countUserScore) {
      if (this.barChartData[0].data) this.barChartData[0].data.push(c);
    }
    this.barChartLabels.sort((a, b) => +a.toString() - +b.toString());
    console.log(this.barChartLabels);

    for (let i = 0; i < this.barChartLabels.length; i++) {
      this.barChartLabels[i] = (+this.barChartLabels[i]/100).toString();
    }
    console.log(this.barChartLabels);
  }
  ngOnInit(): void {
    // console.log(this.results.length);
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
