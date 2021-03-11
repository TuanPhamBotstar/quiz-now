import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { ResultService } from '../../services/result.service';
import 'chartjs-plugin-labels';

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
        fontColor: 'white',
        precision: 2,
        fontSize: 14
        // arc: true
      },
      datalabels: {
        color: 'white',
        font: {
          size: 20
        },
        display: false
      }
    },
    title: {
      text: 'Overview',
      display: true,
      fontSize: 20
    },
    
  };
  public pieChartLabels: Label[] = ['Weak score', 'Average score', 'Good score', 'Excellent score'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['#E95B54', '#FBCE4A', '#3CAF85', '#309FDB']
  }];

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

    // this.pieChartData = [
    //   (+(this.weakScore / sum * 100).toFixed(2)),
    //   +(this.averageScore / sum * 100).toFixed(2),
    //   +(this.goodScore / sum * 100).toFixed(2),
    //   +(this.excellentScore / sum * 100).toFixed(2),
    // ];
    this.pieChartData = [
      (+(this.weakScore)),
      +(this.averageScore),
      +(this.goodScore),
      +(this.excellentScore),
    ];
    
    console.log(this.excellentScore);
  }
}
