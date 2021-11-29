import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AxControlComponent } from './components/ax-control/ax-control.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [AxControlComponent],
  declarations: [AxControlComponent],
  entryComponents: [],
  providers: []
})
export class SharedModule {
}
