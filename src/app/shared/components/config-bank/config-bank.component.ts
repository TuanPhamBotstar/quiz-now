import { ElementRef } from '@angular/core';
import { Component, HostListener, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-config-bank',
  templateUrl: './config-bank.component.html',
  styleUrls: ['./config-bank.component.css'],
})
export class ConfigBankComponent implements OnInit {
  @Input() bankId: any;
  @Output() emitEventCloseModal = new EventEmitter<boolean>();

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      console.log('hel')
      // this.emitEventCloseModal.emit(false)
    }
  }
  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}
}
