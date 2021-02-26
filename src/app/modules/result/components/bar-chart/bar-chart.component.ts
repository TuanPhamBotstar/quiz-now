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
  constructor(private resultService: ResultService) {}

  countUserScore: any = [];

  ngOnChanges(changes: any) {
    if (this.resultObserver) this.resultObserver.unsubscribe();

    this.getLabels();
  }
  getLabels() {
    this.resultObserver = this.resultService.analyzeWithScore(this.idTest, this.time + "").subscribe((res) => {
      this.barChartLabels = res.data.map((result : any) => result._id)
      this.barChartData[0].data = res.data.map((result: any) => result.count);
    });

  }
  ngOnInit(): void {
    this.getLabels();
    this.barChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          algin: 'end',
          color: 'white',
        },
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
