import { Component, OnInit } from '@angular/core';
import { isJSDocThisTag } from 'typescript';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  isLogin: boolean = false;

  ngOnInit() {
    this.authenticationService.checkAuthentication().subscribe(res => {
      this.isLogin = res.isLogin;
    })
  }
}
