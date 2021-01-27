import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  getAllBanks,
  getOneBank,
  getBankQuestions,
  getOneQuestion,
} from '../../store/bank.reducers';
import {
  GetAllBanks,
  GetBankById,
  GetBankQuestions,
  GetQuestionById,
  UpdateQuestion,
} from '../../store/bank.actions';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getBankInfo(bankId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get/' + bankId);
  }
  getBanks(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get');
  }
  getBankQuestions(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get/questions/' + id);
  }
  createBank(bank: any) {
    this.http
      .post<any>('http://localhost:3000/bank/create', bank, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
  getQuestion(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/question/' + id);
  }
  updateQuestion(newQuestion: Question): Observable<any> {
    return this.http.put<any>(
      'http://localhost:3000/bank/question/',
      newQuestion
    );
  }
  getBanksDataStore() {
    return this.store.select(getAllBanks);
  }
  getOneBankDataStore() {
    return this.store.select(getOneBank);
  }
  getBanksStore() {
    this.store.dispatch(new GetAllBanks());
    return this.store.select(getAllBanks);
  }
  getBankInfoStore(id: any) {
    this.store.dispatch(new GetBankById(id));
    return this.store.select(getOneBank);
  }
  getBankQuestionsStore(id: any) {
    this.store.dispatch(new GetBankQuestions(id));
    return this.store.select(getBankQuestions);
  }
  getQuestionStore(id: any) {
    this.store.dispatch(new GetQuestionById(id));

    return this.store.select(getOneQuestion);
  }
  updateQuestionStore(newQuestion: Question) {
    this.store.dispatch(new UpdateQuestion(newQuestion));

    return this.store.select(getOneQuestion);
  }
}

export interface Bank {
  _id: string;
  questions: string[];
  test: string[];
  title: string;
  owner: string;
}
