import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BankService } from 'src/app/modules/bank/services/bank.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() changeNavBar: string = '';
  @Input() currentLink: string = '';
  @Input() bankId: string = '';
  @Input() levelName: string = '';

  @Output() emitEventDelete = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private bankService: BankService,
    private _location: Location
  ) {}
  name: string | null = localStorage.getItem('name');

  showLogOutDropdown: boolean = false;
  showModalDelete: boolean = false;
  showConfigDropdown: boolean = false;

  goHome() {
    this.router.navigate(['/home']);
  }
  goYour() {
    this.router.navigate(['/bank/view'], { queryParams: { page: '1' } });
  }
  goResult() {
    this.router.navigate(['/result'], { queryParams: { page: '1' } });
  }

  changeConfigDropdown() {
    this.showConfigDropdown = !this.showConfigDropdown;
  }

  changeStateShowLogOut() {
    this.showLogOutDropdown = !this.showLogOutDropdown;
  }
  logOut() {
    localStorage.clear();
    window.location.reload();
  }
  emitDeleteBank() {
    this.emitEventDelete.emit(true);
    this.currentLink = 'delete';
  }

  goToViewTests() {
    this.router.navigate([`/bank/view/${this.bankId}`]);
  }
  goToCreateTest() {
    this.currentLink = 'create';
    this.router.navigate([`/bank/view/${this.bankId}/create/test`]);
  }
  goToViewQuestions() {
    this.currentLink = 'view';

    this.router.navigate([`/bank/view/${this.bankId}/questions`]);
  }
  goToDashboard() {
    this.router.navigate([`/bank/dashboard/${this.bankId}`]);
  }
  openModal() {
    this.showModalDelete = true;
  }
  closeModal() {
    this.showModalDelete = false;
  }
  goBack(e: any) {
    if (e) this._location.back();
  }
  // deleteBank(id: any) {
  //   console.log(id);
  //   if (id) {
  //     this.bankService.deleteBankStore(id);
  //     this._location.back();
  //   } else this.showModalDelete = false;
  // }
  ngOnInit(): void {
    this.currentLink = window.location.href.slice(22);
  }
}
