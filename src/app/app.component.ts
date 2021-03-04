import { ComponentRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { isJSDocThisTag } from 'typescript';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { ResultWithTestComponent } from './modules/result/components/result-with-test/result-with-test.component';
import { ResultWithUserComponent } from './modules/result/components/result-with-user/result-with-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  isLogin: boolean = false;
  isSend: boolean = false;
  
  changeBar: any;

  idBank: any;
  idTest: any;

  ngOnInit() {
    this.authenticationService.checkAuthentication().subscribe((res) => {
      if (res) {
        this.isLogin = res.isLogin;
        this.isSend = true;
      }
    });
  }
  onActivate(event: any) {
    if (event instanceof ResultWithTestComponent || event instanceof ResultWithUserComponent) {
      this.changeBar = true;
      this.idBank = event.idBank;
      this.idTest = event.idTest;
    } else this.changeBar = false;
  }
}
