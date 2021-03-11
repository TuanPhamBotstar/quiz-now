import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() resultsAreReceived: any = null;
  @Input() maxLength: any;
  @Input() idTest: any;
  @Input() time: any;

  results: any = [];

  resultObserver: any;

  maxScore: number = 0;
  barChartOptions: ChartOptions | any;

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{ data: [], label: 'Users' }];
  barChartColor: Color[] = [
    {
      backgroundColor: '#568fc7',
    },
  ];
  constructor(private resultService: ResultService) {}

  countUserScore: any = [];

  ngOnChanges(changes: any) {
    if (this.resultObserver) this.resultObserver.unsubscribe();

    this.getLabels();
  }
  getLabels() {
    this.resultObserver = this.resultService
      .analyzeWithScore(this.idTest, this.time + '')
      .subscribe((res) => {
        console.log(res);

        this.barChartLabels = res.data.map((result: any) => result._id);

        this.barChartData[0].data = res.data.map((result: any) => result.count);

        this.maxLength = Math.max(...res.data.map((r: any) => r.count)) + 1;

        this.barChartOptions.scales.yAxes[0].ticks.max = this.maxLength
      });
  }
  ngOnInit(): void {
    this.getLabels();

    this.barChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          display: false
        },
        labels: {
          render: 'value'
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
              labelString: 'Scores',
            },
          },
        ],
      },
      title: {
        display: true,
        text: 'Score spectrum',
        fontSize: 20,
      },
    };
  }
}
