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
  public pieChartData: SingleDataSet = [0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private resultService: ResultService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnChanges(changes: any) {
    console.log('ha');
    if (this.resultObserver) this.resultObserver.unsubscribe();
  
    this.getLabels();
  }
  getLabels() {
    this.shouldRender = false;
    
    this.resultObserver = this.resultService
      .analyzeScoreWithPieChart(this.idTest, this.time + '')
      .subscribe((res) => {
        console.log(res);
        const sum = res.data.reduce((total: any, first:any) => {
          return total + first.count;
        }, 0)

        for (let data of res.data) {
          this.pieChartData[data._id] = (+(data.count/sum).toFixed(3))*100;
        }
        this.shouldRender = true;
      });
  }
  ngOnInit(): void {
    this.getLabels();
  }
}
