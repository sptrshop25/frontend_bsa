import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, ...args: unknown[]): string {
    if (value === 0) {
      return 'Free';
    } else if (value === null || value === undefined) {
      return '';
    } else {
      return 'Rp' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
}
