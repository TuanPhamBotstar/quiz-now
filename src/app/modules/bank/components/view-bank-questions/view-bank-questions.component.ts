import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';

import { Question } from '../../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bank-questions',
  templateUrl: './view-bank-questions.component.html',
  styleUrls: ['./view-bank-questions.component.css'],
})
export class ViewBankQuestionsComponent implements OnInit {
  constructor(private bankService: BankService, private router: Router) {}

  bankId: string | any;
  questions: Question[] = [];
  bankName: string | any;

  ngOnInit(): void {
    this.getBankId();
    this.getBankInfo();
    this.getBankQuestions();
  }

  getBankInfo() {
    this.bankService.getOneBankDataStore().subscribe(res => {
      if (res) {
        this.bankName = res.title;
      } else {
        this.bankService.getBankInfoStore(this.bankId).subscribe(res => {
          this.bankName = res.title;
        })
      }
    })
  }
  getBankId() {
    const id = window.location.href.slice(32, 32+24);
    this.bankId = id;
  }
  getBankQuestions() {
    this.bankService.getBankQuestionsStore(this.bankId).subscribe((res) => {
      console.log(res);
      this.questions = res;
    });
  }
  goToQuestion(id: any) {
    this.router.navigate([`/bank/question/${id}`]);
  }
}
