import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  transform(time: string): string {
    let res = '';

    let HOUR = Math.floor(parseInt(time) / 3600);
    let MINUTE = Math.floor((parseInt(time) - HOUR * 3600) / 60);
    let SECOND = Math.floor(parseInt(time) - 3600 * HOUR - 60 * MINUTE);

    if (HOUR > 0) {
      if (HOUR < 10) {
        res += '0' + '' + HOUR;
        res += ' : ';
      } else {
        res += HOUR;
        res += ' : '
      }
    }

    if (MINUTE < 10) {
      res += '0' + '' + MINUTE;
    } else res += MINUTE;

    res += ' : ';

    if (SECOND < 10) {
      res += '0' + '' + SECOND;
    } else res += SECOND;

    return res;
  }
}
