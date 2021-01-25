import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getOwnerTest(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/owner')
  }
  createTest(test: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/create', test);
  }
  getAllTest(bankId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/' + bankId);
  }
  getDetailTest(shortId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/access/' + shortId);
  }
  submitTest(answers: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/submit', answers)
  }
}
export interface Test {
  _id: string,
  questions: [];
  code: string;
  link: string;
  title: string;
  requiredName: boolean;
  requiredMsv: boolean;
  knowTheResult: boolean;
  numberOfEasyQuestions: Number;
  numberOfNormalQuestions: Number;
  numberOfHardQuestions: Number;
  time: Number;
  owner: String;
  source: String;
  listUserTake: String;
}
