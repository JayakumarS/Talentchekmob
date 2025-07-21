import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'translate'
}) 
export class TranslatePipe implements PipeTransform {

  constructor() {

    
    }
  /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }  */
  transform(value: any, args?: any): any {
   
  } 
 
}
