import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjMask'
})
export class CpfCnpjMaskPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';

    // Remove tudo que não for número
    const cpfCnpj = value.replace(/\D/g, '');

    // Aplica a máscara para CPF (11 dígitos) ou CNPJ (14 dígitos)
    if (cpfCnpj.length === 11) {
      return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpfCnpj.length === 14) {
      return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    // Retorna o valor original caso não seja um CPF ou CNPJ válido
    return value;
  }
}
