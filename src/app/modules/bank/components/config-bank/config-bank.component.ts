import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../services/bank.service';
import { Location } from '@angular/common';
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';

@Component({
  selector: 'app-config-bank',
  templateUrl: './config-bank.component.html',
  styleUrls: ['./config-bank.component.css'],
})
export class ConfigBankComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bankService: BankService,
    private fb: FormBuilder,
    private _location: Location,
    private router: Router,
    private toastManagementService: ToastManagementService
  ) {}

  bankId: any;
  bankName: any;

  bankForm: any;

  shouldDeleteBank: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bankId = params.id;
    });
    this.bankService.getBankInfoStore(this.bankId).subscribe((res) => {
      if (res) {
        this.bankName = res.title;
        this.bankForm = this.fb.group({
          title: this.bankName,
        });
      }
    });
  }
  onKey(e: any) {
    this.bankName === e.target.value
      ? (this.shouldDeleteBank = true)
      : (this.shouldDeleteBank = false);
  }
  onSubmit() {
    console.log(this.bankForm.value);

    this.bankService.updateBankStore({
      id: this.bankId,
      title: this.bankForm.value.title,
    });

    this.toastManagementService.show('Edit successfully', {
      classname: 'bg-success text-light',
      delay: 3000,
    });
    this.bankName = this.bankForm.value.title;
  }
  deleteBank(id: any) {
    this.bankService.deleteBankStore(id);

    this.toastManagementService.show('Delete successfully', {
      classname: 'bg-success text-light',
      delay: 3000,
    });
    this.router.navigate(['bank/view']);
  }
}
