import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count'
})
export class CountPipe implements PipeTransform{
    transform(n: any, s: any):string {
        if (n.toString() === "1") return n + " " + s;

        return n + " " + s + "s";
    }
}