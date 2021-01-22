import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private toastManagementService: ToastManagementService
  ) {}

  checkAuthentication(): Observable<any> {
    return this.http.get('http://localhost:3000');
  }
  register(user: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/user/register',
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
      }
    );
  }

  login(user: any) {
    this.http
      .post<any>('http://localhost:3000/api/user/login', user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }),
      })
      .subscribe((res) => {
        this.setSession(res);
        if (res.success === true) {
          // this.toastManagementService.show(res.message, {
          //   classname: 'bg-success text-light',
          //   delay: 5000,
          // });
          window.location.reload();
        } else
          this.toastManagementService.show(res.message, {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
      });
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    if (authResult.token) {
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem('username', authResult.username);
      localStorage.setItem('name', authResult.name);

    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('username');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiresAt = localStorage.getItem('expiresAt');
    return moment(expiresAt);
  }
}
