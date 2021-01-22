import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BankService {
  constructor(private http: HttpClient) {}

  getBankInfo(bankId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get/' + bankId);
  }
  getBanks(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/get')
  }
  createBank(bank: any) {
    this.http
      .post<any>('http://localhost:3000/bank/create', bank, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
      }).subscribe((res) => {
        console.log(res)
      })
  }
}

export interface Bank {
  _id: string,
  questions: string[],
  test: string[],
  title: string,
  owner: string
}
