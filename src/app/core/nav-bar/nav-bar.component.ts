import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router) {}
  name: string | null = localStorage.getItem('name');

  showLogOutDropdown: boolean = false;

  currentLink: string | any;

  goHome() {
    this.router.navigate(['/home']);
  }
  goYour() {
    this.router.navigate(['/bank/view'], {queryParams: { page: '1' }});
  }
  goResult() {
    this.router.navigate(['/result'], {queryParams: { page: '1' }});
  }
  changeStateShowLogOut() {
    console.log('hello')
    this.showLogOutDropdown = !this.showLogOutDropdown;
  }
  logOut() {
    localStorage.clear();
    window.location.reload();
  }
  ngOnInit(): void {
    this.currentLink = window.location.href.slice(22);
  }
}
