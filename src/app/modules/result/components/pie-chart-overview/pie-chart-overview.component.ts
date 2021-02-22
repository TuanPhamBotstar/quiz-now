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
  selector: 'app-pie-chart-overview',
  templateUrl: './pie-chart-overview.component.html',
  styleUrls: ['./pie-chart-overview.component.css'],
})
export class PieChartOverviewComponent implements OnInit {
  @Input() results: any;

  weakScore: number = 0;
  averageScore: number = 0;
  goodScore: number = 0;
  excellentScore: number = 0;

  scores: any = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: ['green', 'white', 'red'],
        precision: 2,
      },
    },
  };
  public pieChartLabels: Label[] = ['Weak', 'Average', 'Good', 'Excellent'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private resultService: ResultService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    
    console.log(this.results);
    for (let result of this.results) this.scores.push(+result.score.toFixed(2));

    for (let score of this.scores) {
      if (score * 10 >= 9) this.excellentScore++;
      else if (score * 10 >= 6.5) this.goodScore++;
      else if (score * 10 >= 5) this.averageScore++;
      else this.weakScore++;
    }
    const sum =
      this.weakScore + this.averageScore + this.goodScore + this.excellentScore;

    this.pieChartData = [
      (+(this.weakScore / sum).toFixed(2) * 100),
      +(this.averageScore / sum).toFixed(2) * 100,
      +(this.goodScore / sum).toFixed(2) * 100,
      Math.round(+(this.excellentScore / sum).toFixed(2) * 100),
    ];
    
    console.log(this.excellentScore);
  }
}
