import { Component, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css'],
})
export class ViewBankComponent implements OnInit {
  constructor(private bankService: BankService, private router: Router) {}

  banks: Bank[] | any = [];

  ngOnInit(): void {
    this.getBanks();
  }

  getBanks() {
    this.bankService.getBanks().subscribe((res) => {
      this.banks = res.data;
      console.log(this.banks)
    });
  }
  goToBankDetail(id: any) {
    console.log(id)
    this.router.navigate([`/bank/view/${id}`])
  }
}
