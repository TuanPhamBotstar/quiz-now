import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-modal-require',
  templateUrl: './modal-require.component.html',
  styleUrls: ['./modal-require.component.css'],
})
export class ModalRequireComponent implements OnInit {
  @Input() test: any;
  @Output() infoEmitEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private testService: TestService) {}

  infoRequireForm = this.fb.group({
    code: [''],
    infos: this.fb.array([]),
  });

  get infos() {
    return this.infoRequireForm.controls.infos as FormArray;
  }
  get infosFormGroup() {
    return this.infos.controls as FormGroup[];
  }

  ngOnInit(): void {
    for (let require of this.test.requireInfo) {
      this.infos.push(
        this.fb.group({
          info: require.info,
          value: '',
        })
      );
    }

  }
  onSubmit() {
    this.testService.checkCode(Object.assign({idTest: this.test._id}, this.infoRequireForm.value)).subscribe(res => {
      if (~res.message.indexOf('WRONG')) {
        alert('wrong code');
      } else {
        this.infoEmitEvent.emit(this.infoRequireForm.value);
      }
    })
  }
}
