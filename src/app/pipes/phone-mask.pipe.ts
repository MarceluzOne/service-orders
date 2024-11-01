import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask'
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    // Remove tudo que não for número
    let phone = value.replace(/\D/g, '');

    // Formata para telefones com 8 ou 9 dígitos
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value; // Retorna o valor original caso não seja um número válido
  }
}