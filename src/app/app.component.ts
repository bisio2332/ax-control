import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorInterface } from './interfaces/error.interface';
import { DateValidator } from './shared/validators/date.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ax-control';
  axControl: string = 'Title'
  form: FormGroup = new FormGroup({
    axControl: new FormControl(null,
      [
        Validators.required,
        DateValidator.dateValidator
      ])
  });
  isControlDisable: boolean = false;
  errorsToDisplay: ErrorInterface[] = [
    {
      error: 'required',
      message: 'Required'
    },
    {
      error: 'incorrectDate',
      message: 'Incorrect Date'
    }
  ];

  stateToggle(): void {
    this.isControlDisable ? this.form.get('axControl')?.enable() : this.form.get('axControl')?.disable();
    this.isControlDisable = !this.isControlDisable;
  }
}
