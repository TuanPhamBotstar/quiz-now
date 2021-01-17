import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastManagementService } from 'src/app/shared/components/toast-management/toast-management.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomvalidatorService } from '../../services/customvalidator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private customvalidator: CustomvalidatorService,
    private toastManagementService: ToastManagementService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, this.customvalidator.validateUsername()]],
      password: ['', [Validators.required, this.customvalidator.checkPasswordWhetherStrong()]],
      msv: ['', [Validators.required, this.customvalidator.validateStudentId()]],
      mail: ['', Validators.email],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const newUser = Object.assign({'avatarUrl': ""}, this.registerForm.value);
    if (this.registerForm.valid) {
      this.authenticationService.register(newUser);
    }
  }
}
