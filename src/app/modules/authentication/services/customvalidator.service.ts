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
      if (control.value) {
        let isUpperCase: boolean = false;
        let isSpecialCharacter: boolean = false;
        let isNumber: boolean = false;
        let isLength: boolean = false;

        if (control.value.length >= 8) isLength = true;

        for (let c of control.value) {
          if (c === c.toUpperCase()) isUpperCase = true;
          if (~this.specialCharacters.indexOf(c)) isSpecialCharacter = true;
          if (!isNaN(parseFloat(c)) && !isNaN(c - 0)) isNumber = true;
        }

        if (!isUpperCase || !isSpecialCharacter || !isNumber || !isLength)
          return { checkPasswordWhetherStrong: true };
        else return null;
      }
      return null;
    };
  }
  validateUsername() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value)
        for (let c of control.value) {
          if (~this.specialCharacters.indexOf(c) || control.value.length < 6) {
            return { validateUsername: true };
          }
        }
      return null;
    };
  }
  validateStudentId() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value)
        if (control.value.indexOf('FU') !== 0 || control.value.length != 8) {
          return { validateStudentId: true };
        }
      return null;
    };
  }
}
