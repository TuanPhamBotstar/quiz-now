import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastManagementService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log(textOrTpl);
    
    this.toasts.push({ textOrTpl, ...options });
  }
  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
  constructor() {}
}
