import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TestModule } from 'src/app/modules/test/test.module';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @Input() resultsAreReceived: any;
  @Input() maxLength: any;

  results: any = [];

  min: any;
  max: any;
  mils: number = 3600 * 1000 * 24;
  range: any;

  ngOnChanges(changes: any) {
    // console.log(changes);

    this.results = changes.resultsAreReceived.currentValue;
    this.results = this.results.sort((a: any, b: any) => a.time - b.time);

    console.log(this.results);
    this.getLabels();
  }
  constructor() {}
  objectData: any = {};

  public lineChartData: any[] = [{ data: [], label: 'Users' }];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: any;
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: any = 'line';
  public lineChartPlugins = [];

  getLabels() {
    this.min = this.changeTimeStamp(this.results[0].time);
    this.max = this.changeTimeStamp(this.results[this.results.length - 1].time);

    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
    this.objectData = {};

    this.range = (this.max - this.min) / this.mils;

    for (let result of this.results) {
      console.log(result.time);
      result.time = this.changeTimeStamp(result.time);
      // console.log(result.time);

      if (this.objectData[result.time] >= 1) {
        this.objectData[result.time]++;
      } else this.objectData[result.time] = 1;
    }
    console.log(this.objectData);
    const firstLength = Object.keys(this.objectData).length;

    for (let i = firstLength - 1; i <= this.range; i++) {
      console.log(i - (firstLength - 1) + 1);
      if (
        this.objectData[this.min + (i - (firstLength - 1) + 1) * this.mils] >= 1
      ) {
      } else
        this.objectData[this.min + (i - (firstLength - 1) + 1) * this.mils] = 0;
    }
    console.log(this.objectData);
    this.lineChartLabels = Object.keys(this.objectData);
    this.lineChartData[0].data = Object.values(this.objectData);

    let tmpLabel;
    let tmpData;

    for (let i = 0; i < this.lineChartLabels.length - 1; i++) {
      for (let j = i + 1; j < this.lineChartLabels.length; j++) {
        if (+this.lineChartLabels[j] < +this.lineChartLabels[i]) {
          tmpLabel = this.lineChartLabels[j];
          this.lineChartLabels[j] = this.lineChartLabels[i];
          this.lineChartLabels[i] = tmpLabel;

          tmpData = this.lineChartData[0].data[j];
          this.lineChartData[0].data[j] = this.lineChartData[0].data[i];
          this.lineChartData[0].data[i] = tmpData;
        }
      }
    }
    this.lineChartLabels = this.lineChartLabels.map((label) =>
      this.convertToDate(+label)
    );
  }
  ngOnInit(): void {
    this.results = this.resultsAreReceived;

    this.results = this.results.sort((a: any, b: any) => a.time - b.time);

    this.getLabels();
    // console.log(this.lineChartData[0].data);

    this.lineChartOptions = {
      responsive: true,
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
  changeTimeStamp(timestamp: any): number {
    const a = new Date(timestamp);

    let date = a.getDate();
    let month = a.getMonth();
    let year = a.getFullYear();

    const time: any = new Date(year, month, date);
    // console.log(time)
    // console.log(Date.parse(time))
    // console.log(this.convertToDate(Date.parse(time)))
    return Date.parse(time);
  }
  convertToDate(timestamp: any): string {
    var a = new Date(timestamp);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();

    return month + ' ' + date;
  }
}
