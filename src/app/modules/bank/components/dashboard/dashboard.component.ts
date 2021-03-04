import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ResultService } from 'src/app/modules/result/services/result.service';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private resultService: ResultService,
    private bankService: BankService,
    private route: ActivatedRoute
  ) {}

  bankId: string = '';
  linkId: string = '';

  results: any = null; 

  isFetched: boolean = false;
  
  ngOnInit(): void {
    this.linkId = this.route.snapshot.paramMap.get('id') + "";

    this.getBankId();
    this.getResults();
  }
  getResults(): void {
    let resultObserver: Observable<any>;
    
    if (this.bankId) {
      resultObserver = this.resultService.analyzeWithBankId(this.bankId);
    } else resultObserver = this.resultService.analyzeWithBankId(this.linkId);

    resultObserver.subscribe(res => {
      if (res) {
        console.log(res)
        this.results = res.data;
        this.isFetched = true;
      }
    })
  }
  getBankId(): void {
    this.bankService
      .getOneBankDataStore()
      .pipe(filter((res) => res != null))
      .subscribe((res) => {
        if (res) {
          this.bankId = res._id;
        }
      });
  }
}
