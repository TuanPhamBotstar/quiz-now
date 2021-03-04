import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() value: any;
  @Input() testId: any;
  @Output() emitEventCloseModal = new EventEmitter();
  @Input() showModalConfirm: boolean = false;
  
  score: number = 0;

  constructor(private testService: TestService) {}

  ngOnInit(): void {}

  submitAnswers(): void {
    this.testService
      .submitTest(Object.assign({ testId: this.testId }, this.value))
      .subscribe((res) => {
        if (res.data) this.score = res.data;

        this.emitEventCloseModal.emit(this.score);
      });
  }
  closeModal(): void {
    this.showModalConfirm = false;
    this.emitEventCloseModal.emit(false);
  }
}
