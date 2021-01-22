import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  createTest(test: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/test/create', test);
  }
  getAllTest(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test');
  }
  getDetailTest(shortId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/test/access/' + shortId);
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
