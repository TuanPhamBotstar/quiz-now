import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';

import { Question } from '../../models/question';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-bank-questions',
  templateUrl: './view-bank-questions.component.html',
  styleUrls: ['./view-bank-questions.component.css'],
})
export class ViewBankQuestionsComponent implements OnInit {
  constructor(
    private bankService: BankService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  bankId: string | any;
  questions: Question[] = [];
  bankName: string | any;

  pages: number = 0;
  currentPage: string = '0';

  showModalAdd: boolean = false;

  link: any;
  ngOnInit(): void {
    this.getPage();

    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    this.getBankId();

    this.getBankInfo();
    this.getBankQuestions(this.currentPage);

    this.link = `/bank/view/${this.bankId}/questions`;
  }
  questionForm = this.fb.group({
    title: [''],
    level: [''],
    answers: this.fb.array([]),
  });
  openModal() {
    this.showModalAdd = true;
  }
  getPage() {
    this.bankService.getPageQuestions(this.bankId).subscribe((res) => {
      if (res.data) this.pages = res.data;
      console.log(this.pages);
    });
  }
  addAnswers(event: any) {
    this.questionForm.value.answers = event;

    this.bankService.addQuestionStore(
      Object.assign({ idBank: this.bankId }, this.questionForm.value)
    );
    if (this.questions.length === 5 && +this.currentPage === this.pages) {
      this.pages = this.pages + 1;
    }

    this.showModalAdd = false;
  }
  getBankInfo() {
    this.bankService.getOneBankDataStore().subscribe((res) => {
      if (res) {
        this.bankName = res.title;
      } else {
        this.bankService.getBankInfoStore(this.bankId).subscribe((res) => {
          this.bankName = res.title;
        });
      }
    });
  }
  getBankId() {
    const id = window.location.href.slice(32, 32 + 24);
    this.bankId = id;
  }
  getBankQuestions(page: any) {
    this.getPage();
    this.currentPage = page;
    this.bankService.getBankQuestionsStore(this.bankId, page);

    this.bankService.getQuestionsDataStore().subscribe((res) => {
      this.questions = res;
    });
  }
  closeModal(): void {
    this.showModalAdd = false;
  }
  goToQuestion(id: any) {
    this.router.navigate([`/bank/question/${id}`]);
  }
}
