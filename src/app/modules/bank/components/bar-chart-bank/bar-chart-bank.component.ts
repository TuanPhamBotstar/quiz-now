import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart-bank',
  templateUrl: './bar-chart-bank.component.html',
  styleUrls: ['./bar-chart-bank.component.css'],
})
export class BarChartBankComponent implements OnInit {
  @Input() results: any;
  @Input() bankName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.barChartLabels = this.results.map((result: any) => result.title);
    console.log(this.barChartLabels);

    this.barChartData.push({
      data: this.results.map((result: any) => result.total),
      label: 'Total',
      yAxisID: '1',
    });
    this.barChartData.push({
      data: this.results.map((result: any) => ((+(result.score * 10).toFixed(2))/(result.total)).toFixed(2)),
      label: 'Score',
      yAxisID: '2',
    });

    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            id: '1',
            position: 'left',
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              min: 0,
              // max: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'Total user per test',
            },
          },
          {
            id: '2',
            position: 'right',
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              min: 0,
              // max: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'Average score per test',
            },
          },
        ],
        xAxes: [
          {
            display: true,
            ticks: {
              fontSize: 10,
            },
            scaleLabel: {
              display: true,
              labelString: "Test's name",
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          display: false
        },
        labels: {
          render: 'value'
        }
      },
      title: {
        text: `${this.bankName}'s statistics`,
        display: true,
        fontSize: 24,
      },
    };
  }
  public barChartOptions: ChartOptions | any;

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
}
