import { Component, forwardRef, Input, OnDestroy, OnInit, Provider } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR, ValidatorFn
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ErrorInterface } from '../../../interfaces/error.interface';

const AX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AxControlComponent),
  multi: true
};

@Component({
  selector: 'ax-control',
  templateUrl: './ax-control.component.html',
  styleUrls: ['./ax-control.component.scss'],
  providers: [AX_CONTROL_VALUE_ACCESSOR]
})
export class AxControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() title: string | undefined;
  @Input() errorConfig: ErrorInterface[] | undefined;

  @Input() set validators(validators: ValidatorFn | null | undefined) {
    this.control.setValidators(validators as ValidatorFn);
  }

  control: FormControl = new FormControl();
  errorsToDisplay: ErrorInterface[] | undefined;
  notifier: Subject<void> = new Subject();
  private onTouched!: Function;
  private onChange = (value: string) => {
  };

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.notifier)).subscribe((res: string) => {
      this.onChange(res);
    });

    this.control.statusChanges.pipe(takeUntil(this.notifier)).subscribe(() => {
      this.errorsToDisplay = this.errorConfig?.filter(item => {
        if (this.control.errors) {
          return this.control.errors[item.error];
        }
      });
    });
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable({ emitEvent: false }) : this.control.enable({ emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  clear(): void {
    this.control.reset();
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
