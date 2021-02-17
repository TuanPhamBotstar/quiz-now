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
} from '../../store/bank/bank.reducers';
import {
  AddQuestion,
  CreateBank,
  DeleteBank,
  GetAllBanks,
  GetBankById,
  GetBankQuestions,
  GetQuestionById,
  UpdateQuestion,
} from '../../store/bank/bank.actions';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getPage(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/page');
  }
  getBankInfo(bankId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get/' + bankId);
  }
  getBanks(page: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get/page/' + page);
  }
  getBankQuestions(info: any): Observable<any> {
    console.log(info);
    return this.http.post<any>('http://localhost:3000/bank/get/questions', info);
  }
  createBank(bank: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bank/create', bank, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    });
  }
  deleteBank(id: any): Observable<any> {
    console.log(id);
    return this.http.delete<any>('http://localhost:3000/bank/delete/' + id);
  }
  searchBankByName(name: any, page = '1') {
    return this.http.post<any>('http://localhost:3000/bank/search/', {name: name, page: page});
  }
  getPageQuestions(id: any) {
    return this.http.get<any>('http://localhost:3000/bank/question/page/' + id);
  }
  getQuestion(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/question/' + id);
  }
  addQuestion(question: any): Observable<any> {
    console.log(question);
    return this.http.post<any>(
      'http://localhost:3000/bank/question/',
      question
    );
  }
  updateQuestion(newQuestion: Question): Observable<any> {
    return this.http.put<any>(
      'http://localhost:3000/bank/question/',
      newQuestion
    );
  }

  getQuestionsDataStore() {
    return this.store.select(getBankQuestions);
  }
  getBanksDataStore() {
    return this.store.select(getAllBanks);
  }
  getOneBankDataStore() {
    return this.store.select(getOneBank);
  }
  getBanksStore(page: string) {
    this.store.dispatch(new GetAllBanks(page));

    // this.store.select(getAllBanks);
  }
  createBankStore(id: any) {
    this.store.dispatch(new CreateBank(id));
  }
  deleteBankStore(id: any) {
    this.store.dispatch(new DeleteBank(id));
  }
  getBankInfoStore(id: any) {
    this.store.dispatch(new GetBankById(id));
    return this.store.select(getOneBank);
  }
  getBankQuestionsStore(id: any, page = '1') {
    this.store.dispatch(new GetBankQuestions({id: id, page: page}));
  }

  getQuestionStore(id: any) {
    this.store.dispatch(new GetQuestionById(id));

    return this.store.select(getOneQuestion);
  }
  addQuestionStore(newQuestion: Question) {
    this.store.dispatch(new AddQuestion(newQuestion));
  }
  updateQuestionStore(newQuestion: Question) {
    this.store.dispatch(new UpdateQuestion(newQuestion));

    return this.store.select(getOneQuestion);
  }
}

export interface Bank {
  _id: string;
  idQuestions: string[];
  idTests: string[];
  title: string;
  owner: string;
}
