import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';
import { TestModule } from 'src/app/modules/test/test.module';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @Input() maxLength: any;
  @Input() idTest: any;
  @Input() time: any;

  results: any = [];
  resultObserver: any;

  min: any;
  max: any;
  mils: number = 3600 * 1000 * 24;
  range: any;

  ngOnChanges(changes: any) {
    if (this.resultObserver) this.resultObserver.unsubscribe();

    this.getLabels();
  }
  constructor(private resultService: ResultService) {}
  objectData: any = {};

  public lineChartData: any[] = [{ data: [], label: 'Users', borderWidth: 1 }];
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
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];

    this.resultObserver = this.resultService
      .analyzeTimeWithLineChart(this.idTest, this.time)
      .pipe(take(1))
      .pipe(filter((res: any) => res != null))
      .subscribe((res) => {
        this.objectData = {};
        this.results = res.data;

        this.min = this.changeTimeStamp(this.results[0].time);
        this.max = this.changeTimeStamp(
          this.results[this.results.length - 1].time
        );

        this.range = (this.max - this.min) / this.mils;

        for (let result of this.results) {
          result.time = this.changeTimeStamp(result.time);

          if (this.objectData[result.time] >= 1) {
            this.objectData[result.time]++;
          } else this.objectData[result.time] = 1;
        }
        const firstLength = Object.keys(this.objectData).length;
        let test = Object.keys(this.objectData);

        for (let i = firstLength - 1; i < this.range + firstLength - 1; i++) {
          if (
            this.objectData[
              this.min + (i - (firstLength - 1) + 1) * this.mils
            ] >= 1
          ) {
          } else
            this.objectData[
              this.min + (i - (firstLength - 1) + 1) * this.mils
            ] = 0;
        }

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

        console.log(this.lineChartLabels);
      });
  }
  ngOnInit(): void {
    this.getLabels();

    this.lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: this.results && 0,
              stepSize: 1,
              // max: this.maxLength,
            },
            scaleLabel: {
              display: true,
              labelString: 'Users',
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Date',
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
