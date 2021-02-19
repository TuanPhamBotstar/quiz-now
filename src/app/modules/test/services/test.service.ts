import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getTest, getAllTest } from '../../store/bank/bank.reducers';

import { GetTestById, GetAllTest, CreateTest } from '../../store/bank/bank.actions';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getPage(id: any) {
    return this.http.get<any>('http://localhost:3000/test/page/' + id);
  }
  getOwnerTest(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/owner');
  }
  createTest(test: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/create', test);
  }
  getOneQuestionInTest(info: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/question', info)
  }
  getAllTest(info: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test', info);
  }
  getTestById(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/detail/' + id);
  }
  getDetailTest(shortId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/access/' + shortId);
  }
  submitTest(answers: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/submit', answers, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
    });
  }
  checkCode(code: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/check/code', code);
  }
  getAllTestDataStore() {
    return this.store.select(getAllTest);
  }
  getAllTestStore(id: any, page: any = '1') {
    this.store.dispatch(new GetAllTest({id: id, page: page}));
  }
  getDetailTestStore(id: any): Observable<any> {
    this.store.dispatch(new GetTestById(id));
    return this.store.select(getTest);
  }
  createTestStore(test: any) {
    this.store.dispatch(new CreateTest(test))
  }
}
export interface Test {
  _id: string;
  questions: [];
  code: string;
  link: string;
  title: string;
  requiredInfo: [];
  knowTheResult: boolean;
  numberOfEasyQuestions: Number;
  numberOfNormalQuestions: Number;
  numberOfHardQuestions: Number;
  time: Number;
  idOwner: String;
  source: String;
}
