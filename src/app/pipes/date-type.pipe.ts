import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateType'
})
export class DateTypePipe implements PipeTransform {
  transform(value: string, args?: any) {
    if (!value) return;
        moment.locale('pt-BR');
        return moment(value).format('DD/MM/YYYY').toLocaleUpperCase();
  }

}
