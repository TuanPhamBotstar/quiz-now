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
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';
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
  @Input() bankId: string = '';
  @Output() eventCloseModal = new EventEmitter<boolean>();

  count: number = 1;
  isAdding: boolean = false;

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      if (this.count > 1) this.eventCloseModal.emit(true);
      else this.count++;
    }
  }
  constructor(
    private bankService: BankService,
    private fb: FormBuilder,
    private _eref: ElementRef,
    private toastManagementService: ToastManagementService
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
    if (
      (!this.questionForm.value.title ||
        this.questionForm.value.answers.length < 2 ||
        !this.questionForm.value.level) &&
      !this.isDeleted
    ) {
      this.toastManagementService.show('Invalid question, please try again', {
        classname: 'bg-danger text-light',
        delay: 1500,
      });
    } else {
      if (this.isDeleted) this.questionForm.reset();
      if (!this.isAdding) {
        this.bankService
          .updateQuestionStore(
            Object.assign({ _id: this.questionId }, this.questionForm.value)
          )
          .subscribe((res) => {
            if (res) {
              this.eventCloseModal.emit(true);

              if (!this.isDeleted)
                this.toastManagementService.show('Edit successfully', {
                  classname: 'bg-success text-light',
                  delay: 1500,
                });
              else this.toastManagementService.show('Deleted', {
                classname: 'bg-success text-light',
                delay: 1500
              })
            }
          });
      } else {
        this.bankService.addQuestionStore(
          Object.assign({ idBank: this.bankId }, this.questionForm.value)
        );
        this.toastManagementService.show('Add successfully', {
          classname: 'bg-success text-light',
          delay: 1500,
        });
        this.eventCloseModal.emit(true);
      }
    }
  }
  getBankInfo() {}
  addAnswer() {
    this.answers.push(
      this.fb.group({
        title: [''],
        isTrue: false,
      })
    );
    console.log(this.questionForm.value);
  }
  deleteQuestion() {
    this.isDeleted = !this.isDeleted;
  }
  remove(i: any, e: any) {
    this.answers.removeAt(i);
    e.stopPropagation();
  }
  receiveNewAnswer(value: any) {
    console.log(value);
    console.log(this.questionForm.value);
    this.questionForm.value.answers = [
      ...this.questionForm.value.answers,
      ...value.answers,
    ];
  }
  getQuestion() {
    if (this.questionId) {
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
      });
    } else this.isAdding = true;
  }
}
