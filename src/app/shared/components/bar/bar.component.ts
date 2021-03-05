import { ElementRef } from '@angular/core';
import { Component, HostListener, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  NavigationStart,
} from '@angular/router';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  @Input() changeBar: any;
  @Input() idBank: any;
  @Input() idTest: any;

  @HostListener('document: click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
  constructor(
    private eRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  name: string | null = localStorage.getItem('name');

  showDropdown: boolean = false;
  wasInside: boolean = false;

  ngOnInit(): void {

  }

  goHome() {
    this.router.navigate([''])
  }
  logOut() {
    localStorage.clear();
    window.location.replace('/');
  }
  changeStateDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
