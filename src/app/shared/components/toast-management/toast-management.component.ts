import { Component, OnInit, TemplateRef } from '@angular/core';

import { ToastManagementService } from './toast-management.service';

@Component({
  selector: 'app-toast-management',
  templateUrl: './toast-management.component.html',
  host: { '[class.ngb-toasts]': 'true' },
  styleUrls: ['./toast-management.component.css'],
})

export class ToastManagementComponent {
  constructor(public toastManagementService: ToastManagementService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
