import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateM3',
})
export class DateM3Pipe implements PipeTransform {
  transform(value: string | number, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';

    const str = value.toString();

    if (str.length !== 8) return str; // si ce n’est pas YYYYMMDD

    const year = str.substring(0, 4);
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);

    const date = new Date(+year, +month - 1, +day);

    return date.toLocaleDateString('fr-FR'); // format français
  }
}
