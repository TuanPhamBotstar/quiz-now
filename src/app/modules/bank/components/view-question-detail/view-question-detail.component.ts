import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-view-question-detail',
  templateUrl: './view-question-detail.component.html',
  styleUrls: ['./view-question-detail.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class ViewQuestionDetailComponent implements OnInit {
  @Input() questionId: string = '';
  @Output() eventCloseModal = new EventEmitter<boolean>();

  count: number = 1;

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      if (this.count > 1) this.eventCloseModal.emit(true);
      else this.count++;
    }
  }
  constructor(
    private bankService: BankService,
    private fb: FormBuilder,
    private _eref: ElementRef
  ) {}

  // questionId: string = '';

  reFetch: boolean = false;

  questionForm = this.fb.group({
    title: [''],
    level: [''],
    answers: this.fb.array([]),
  });

  isDeleted: boolean = false;

  ngOnInit(): void {
    this.getBankInfo();
    this.getQuestion();
  }
  get answers() {
    return this.questionForm.controls.answers as FormArray;
  }
  get answersFormGroup() {
    return this.answers.controls as FormGroup[];
  }
  onSubmit() {
    if (this.isDeleted) this.questionForm.reset();
    console.log(this.questionForm.value);
    this.bankService
      .updateQuestionStore(
        Object.assign({ _id: this.questionId }, this.questionForm.value)
      )
      .subscribe((res) => {
        if (res) {
          this.eventCloseModal.emit(true);
        }
      });
  }
  getBankInfo() {}
  deleteQuestion() {
    this.isDeleted = !this.isDeleted;
  }
  getQuestion() {
    this.bankService.getQuestion(this.questionId).subscribe((res) => {
      if (res) {
        res = res.data;
        this.questionForm.controls.title.setValue(res.title);
        this.questionForm.controls.level.setValue(res.level);

        for (let answer of res.answers) {
          this.answers.push(
            this.fb.group({
              title: answer.title,
              isTrue: answer.isTrue,
            })
          );
        }
      }

      // console.log(this.questionForm.value);
    });
  }
}
