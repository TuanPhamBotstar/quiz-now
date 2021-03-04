import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BankService } from 'src/app/modules/bank/services/bank.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  @Input() bankId: any = '';
  @Input() showModalDelete: boolean = false;
  @Output() emitShowModal = new EventEmitter<boolean>();
  @Output() emitGoBack = new EventEmitter<boolean>();
  constructor(private bankService: BankService) {}

  ngOnInit(): void {}

  deleteBank(id: any) {
    if (id) {
      this.bankService.deleteBankStore(id);
      this.emitGoBack.emit(true);
    }
    this.showModalDelete = false;

    this.emitShowModal.emit(this.showModalDelete);
  }
}
