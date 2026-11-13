import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'feesCurrency', standalone: true })
export class FeesCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value ?? 0);
  }
}