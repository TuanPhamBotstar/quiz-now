import { Component, HostListener, OnInit } from '@angular/core';
import { BankService, Bank } from '../../services/bank.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css'],
})
export class ViewBankComponent implements OnInit {
  @HostListener('click', ['$event']) onClick($event: any) {
    if (!this.showModalDelete) {
      if (this.showDropdown) {
        this.indexDropdown = null;
      }
      this.showDropdown = !this.showDropdown;
    }
  }
  constructor(
    private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  banks: Bank[] | any = [];
  currentPage: string = '';
  pages: number = 0;
  searchBanks: Bank[] | any = [];
  contentSearch: string = '';

  showModalDelete: boolean = false;
  idToDelete: string = '';
  hidePagination: boolean = false;

  showDropdown: boolean = false;
  indexDropdown: any = null;

  isFetched: boolean = false;
  flag: boolean = false;
  isSearched: boolean = false;

  ngOnInit(): void {
    this.getPage();

    this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

    if (this.currentPage === '1') {
      this.router.navigate(['/bank/view'], { queryParams: { page: '1' } });
    }

    // kiểm tra xem trong store có data ko, nếu có thì lấy nếu không thì fetch
    this.bankService.getBanksDataStore().subscribe((res) => {
      this.currentPage = this.route.snapshot.queryParamMap.get('page') || '1';

      if (res.length < 5 && this.flag == false) {
        this.getBanks(this.currentPage);
        this.flag = true;
      } else {
        this.isFetched = true;
        this.banks = res;
      }
      if (this.flag == true) this.isFetched = true;
    });
  }

  getPage() {
    this.bankService.getPage().subscribe((res) => {
      this.pages = res.data;
    });
  }
  receiveSearchBanks(event: any): void {
    if (event) {
      this.isSearched = event.isSearched;
      this.contentSearch = event.content;

      console.log(event);
      this.searchBanks = event.results;
      if (this.searchBanks.length > 0) {
        this.banks = this.searchBanks;
        this.hidePagination = true;
      } else {
        this.hidePagination = false;
        const newSub = this.bankService.getBanksDataStore().subscribe((res) => {
          console.log(res);
          this.banks = res;
        });
        newSub.unsubscribe();
      }
    }
  }
  goToCreate() {
    this.router.navigate(['/bank/create']);
  }
  getBanks(page: string) {
    this.currentPage = page;
    if (!this.isSearched) this.bankService.getBanksStore(page);
    else
      this.bankService
        .searchBankByName(this.contentSearch, page)
        .subscribe((res) => {
          this.banks = res.data;
        });
  }
  changeStateDropdown(index: any, e: Event) {
    console.log(e)
    this.indexDropdown = index;
    console.log(this.indexDropdown);
    console.log(index);
    e.preventDefault();
  }
  changeShowModalDelete(id: any) {
    this.showModalDelete = !this.showModalDelete;
    // if (!id) this.showModalDelete = false;
    this.idToDelete = id;

    console.log(id);
    if (!id) this.showDropdown = false;
  }
  goToBankDetail(id: any) {
    this.bankService.getBankInfoStore(id);
    this.router.navigate([`/bank/view/${id}/tests`]);
  }
}
