import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() results: any;

  weakStudent: number = 0;
  averageStudent: number = 0;
  goodStudent: number = 0;
  excellentStudent: number = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: ['green', 'white', 'red'],
        precision: 2
      },
    },
  };
  public pieChartLabels: Label[] = ['Weak', 'Average', 'Good', 'Excellent'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    for (let result of this.results) {
      if (result.score >= 0.9) this.excellentStudent++;
      else if (result.score > 0.65) this.goodStudent++;
      else if (result.score >= 0.5) this.averageStudent++;
      else this.weakStudent++;
    }
    const total = this.weakStudent + this.averageStudent + this.goodStudent + this.excellentStudent;

    this.pieChartData = [
      +(this.weakStudent/total).toFixed(2) * 100,
      +(this.averageStudent/total).toFixed(2) * 100,
      +(this.goodStudent/total).toFixed(2) * 100,
      +(this.excellentStudent/total).toFixed(2) * 100,
    ];
  }
}
