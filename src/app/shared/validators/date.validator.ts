import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  static dateValidator(control: AbstractControl) {
    if (control && control.value && !moment(control.value, 'YYYY-MM-DD', true).isValid()) {
      return { incorrectDate: true };
    }
    return null;
  }
}
