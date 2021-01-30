import { Component, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css'],
})
export class ViewBankComponent implements OnInit {
  constructor(
    private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log(this.route.snapshot.queryParamMap.get('page')); 
  }

  banks: Bank[] | any = [];
  currentPage: string = '1';

  ngOnInit(): void {
    this.bankService.getBanksDataStore().subscribe((res) => {
      if (res.length == 0) {
        console.log('hello');
        this.getBanks(this.currentPage);
      }
      this.banks = res;
    });
  }
  goToCreate() {
    this.router.navigate(['/bank/create']);
  }
  getBanks(page: string) {
    this.bankService.getBanksStore(page);
  }
  goToBankDetail(id: any) {
    console.log(id);
    this.router.navigate([`/bank/view/${id}`]);
  }
}
