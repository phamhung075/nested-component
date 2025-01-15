// components/select.example.ts
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DynamicComponent } from '../interface/dynamic-component.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  template: `
    <select [formControl]="control!" class="form-control">
      <option *ngFor="let option of options" [value]="option.value">
        {{option.label}}
      </option>
    </select>
  `,
  styles: [
    `
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `,
  ],
})
export class SelectComponent implements DynamicComponent {
  @Input() options: Array<{ label: string; value: any }> = [];
  @Input() control?: FormControl<any>;

  constructor(public changeDetectorRef: ChangeDetectorRef) {
    this.control = this.control || new FormControl();
  }
}
