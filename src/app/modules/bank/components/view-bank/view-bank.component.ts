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
    
    this.showDropdown = !this.showDropdown
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
      console.log(res);
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
      } else
        this.bankService.getBanksDataStore().subscribe((res) => {
          console.log(res);
          this.banks = res;
        });
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
  changeStateDropdown(index: any) {
    this.indexDropdown = index;
  }
  changeShowModalDelete(id: any) {
    console.log(id);
    console.log(this.idToDelete);

    this.showModalDelete = !this.showModalDelete;
    this.idToDelete = id;
  }
  goToBankDetail(id: any) {
    this.bankService.getBankInfoStore(id);
    this.router.navigate([`/bank/view/${id}`]);
  }
}
