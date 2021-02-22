import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getResultsUser } from '../../store/bank/bank.reducers';
import { GetAllResults } from '../../store/bank/bank.actions';
@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getPage(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/result/page')
  }
  getResultsDataStore(): Observable<any> {
    return this.store.select(getResultsUser)
  }
  getResultsByIdUser(page: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/result/user/' + page);
  }
  getResults(): Observable<any> {
    return this.store.select(getResultsUser);
  }
  getResultsByIdResult(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/result/id/' + id);
  }

  getResultsByIdTest(info: any):Observable<any> {
    return this.http.post<any>('http://localhost:3000/result/test/', info);
  }
  getResultsAndAnalyze(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/result/analyze');
  }

  getResultsByIdUserStore(page: any) {
    this.store.dispatch(new GetAllResults(page));
  }
  getUserNameByIdUser(id: any) : Observable<any> {
    return this.http.get<any>('http://localhost:3000/result/user/name/' + id);
  }
}
