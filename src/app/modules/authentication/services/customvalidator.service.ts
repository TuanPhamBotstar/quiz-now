import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidatorService {
  specialCharacters = [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '^',
    '*',
    '(',
    ')',
    '-',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '|',
    "''",
    '/',
    ':',
    ';',
    '"',
    "'",
    '<',
    '>',
    ',',
    '.',
    '?',
  ];
  checkPasswordWhetherStrong() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let count = 0;

      for (let c of control.value) {
        if (c === c.toUpperCase()) count++;
        else if (~this.specialCharacters.indexOf(c)) count++;
        else if (!isNaN(parseFloat(c)) && !isNaN(c - 0)) count++;
      }

      if (count < 3) return { checkPasswordWhetherStrong: true };
      else return null;
    };
  }
  validateUsername() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      for (let c of control.value) {
        if (~this.specialCharacters.indexOf(c)) {
          return { validateUsername: true };
        }
      }
      return null;
    };
  }
  validateStudentId() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.indexOf('FU') !== 0) {
        return { validateStudentId: true };
      }
      return null;
    };
  }
}
