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

  getResultsByIdUser(): Observable<any> {
    console.log('hello')
    return this.http.get<any>('http://localhost:3000/result/user');
  }
  getResultsByIdResult(id: any) {}
  getResultsByIdTest(id: any) {}

  getResultsByIdUserStore(): Observable<any> {
    this.store.dispatch(new GetAllResults());

    return this.store.select(getResultsUser);
  }
}
