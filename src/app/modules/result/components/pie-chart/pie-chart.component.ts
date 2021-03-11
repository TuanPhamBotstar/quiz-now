import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() resultsAreReceived: any;
  @Input() idTest: any;
  @Input() time: any = 7;

  results: any = [];

  resultObserver: any;

  shouldRender: boolean = false;

  weakStudent: number = 0;
  averageStudent: number = 0;
  goodStudent: number = 0;
  excellentStudent: number = 0;

  tmpData: any = [];

  pieChartOptions: ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      labels: {
        render: 'percentage',
        precision: 2,
        fontColor: 'white',
      },
      datalabels: {
        color: 'white',
        display: false
      },
    },
    title: {
      text: 'Score ratio',
      display: true,
      fontSize: 16,
      position: 'bottom'
    },
  };
  pieChartLabels: Label[] = ['Weak', 'Average', 'Good', 'Excellent'];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  chartColors: Array<any> = [
    {
      backgroundColor: ['#1E81A2', '#16607A', '#3DF0BB', '#09BB9F'],
    },
  ];

  constructor(private resultService: ResultService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnChanges(changes: any) {
    if (this.resultObserver) this.resultObserver.unsubscribe();

    this.getLabels();
  }
  getLabels() {
    this.shouldRender = false;

    this.pieChartData = [];

    this.tmpData = [];

    this.resultObserver = this.resultService
      .analyzeScoreWithPieChart(this.idTest, this.time + '')
      .subscribe((res) => {
        if (res.data.length > 0) {
          const sum = res.data.reduce((total: any, first: any) => {
            return total + first.count;
          }, 0);

          for (let data of res.data) {
            this.tmpData[data._id] = +((data.count));
          }

          for (let i = 0; i < 4; i++) {
            if (!this.tmpData[i]) this.tmpData[i] = 0;
          }

          if (this.tmpData) this.pieChartData = this.tmpData;
          this.shouldRender = true;
        }
      });
  }
  ngOnInit(): void {
    this.getLabels();
  }
}
