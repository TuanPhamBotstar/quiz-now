import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }
  name: string | null = localStorage.getItem('name');

  goHome() {
    this.router.navigate(['/home'])
  }
  goYour() {
    this.router.navigate(['/bank/view'])
  }
   currentLink: string | any;

  ngOnInit(): void {
    this.currentLink = (window.location.href.slice(22))

  }

}
