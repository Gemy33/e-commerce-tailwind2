import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
 
  transform(values:any[],term:string):any[] {
  return values.filter((item)=> item.title.includes(term))
   }
  

}
