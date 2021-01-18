import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  showRegisterForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  changeForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
