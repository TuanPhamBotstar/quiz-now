import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getAllBanks, getOneBank } from '../../store/bank.reducers';
import { GetAllBanks, GetBankById } from '../../store/bank.actions';

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

  getBanksDataStore() {
    return this.store.select(getAllBanks);
  }
  getBanksStore() {
    this.store.dispatch(new GetAllBanks());
    return this.store.select(getAllBanks);
  }
  getBankInfoStore(id: any) {
    this.store.dispatch(new GetBankById(id));
    return this.store.select(getOneBank);
  }
}

export interface Bank {
  _id: string;
  questions: string[];
  test: string[];
  title: string;
  owner: string;
}
