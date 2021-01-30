import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  constructor(private resultService: ResultService) { }

  listResults: any = [];

  ngOnInit(): void {
    this.getResultsByIdUser();
  }
  getResultsByIdUser () {
    this.resultService.getResultsByIdUserStore().subscribe(res => {
      this.listResults = res;
    })
  }
}
