import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-view-bank-questions',
  templateUrl: './view-bank-questions.component.html',
  styleUrls: ['./view-bank-questions.component.css'],
})
export class ViewBankQuestionsComponent implements OnInit {
  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    // this.bankService.getBanksDataStore().subscribe((res) => {
    //   console.log(res);
    // });
  }
}
