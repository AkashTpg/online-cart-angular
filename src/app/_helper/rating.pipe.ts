import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value==null || value==undefined)
      return "No ratings yet"
  }

}
