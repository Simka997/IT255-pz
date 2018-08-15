import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pretraga'
})
export class PretragaPipe implements PipeTransform {
  transform(value: any, value2: any): any {

    if (value2 !== undefined && value2.length > 0) {
      value = value.filter((item: Object) => item['naziv'].toLowerCase().indexOf(value2.toLowerCase()) !== -1);
      return value;
    }
    return null;
  }
}