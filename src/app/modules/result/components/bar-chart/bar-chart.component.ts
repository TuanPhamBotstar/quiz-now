import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() resultsAreReceived: any = null;
  @Input() maxLength: any;

  results : any = [];

  maxScore: number = 0;
  barChartOptions: ChartOptions | any;

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

  ngOnChanges(changes: any) {
    // console.log();
    this.results = changes.resultsAreReceived.currentValue;

    this.getLabels();
  }
  getLabels() {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.countUserScore = [];
    
    console.log(this.results);
    for (let result of this.results) {
      let score = (result.score * 10).toFixed(2).toString();
      score = (+score * 100).toFixed(2);
      if (this.barChartLabels.indexOf(score) == -1) {
        this.countUserScore[+score * 100] = 1;
        // console.log(score);
        this.barChartLabels.push(score);
      } else {
        this.countUserScore[+score * 100] =
          this.countUserScore[+score * 100] + 1;
      }
      // console.log(this.barChartLabels);
    }
    // console.log(this.countUserScore);

    this.countUserScore = this.countUserScore.filter((res: any) => {
      return res != null;
    });
    // console.log(this.countUserScore);
    for (let c of this.countUserScore) {
      if (this.barChartData[0].data) this.barChartData[0].data.push(c);
    }
    this.barChartLabels.sort((a, b) => +a.toString() - +b.toString());
    // console.log(this.barChartLabels);

    for (let i = 0; i < this.barChartLabels.length; i++) {
      this.barChartLabels[i] = (+this.barChartLabels[i]/100).toString();
    }
    // console.log(this.barChartLabels);

  }
  ngOnInit(): void {
    this.results = this.resultsAreReceived; 
    // console.log(this.results.length);
    this.getLabels();
    this.barChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          algin: 'end',
          color: 'white'
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: this.results && 0,
              stepSize: 1,
              max: this.maxLength,
            },
          },
        ],
      },
    };
  }
}
