import { Component, Input, ChangeDetectorRef, OnInit, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicComponent, Some_Model } from '../interface/dynamic-component.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="select-wrapper">
      <select [formControl]="control!" class="select-control">
        @for(option of options; track option.value) {
          <option [value]="option.value">{{option.label}}</option>
        }
      </select>
    </div>
  `,
  styles: [`
    .select-wrapper {
      width: 100%;
      position: relative;
    }

    .select-control {
      width: 100%;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 1.5;
      color: #333;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 16px;
      cursor: pointer;
    }

    .select-control:focus {
      outline: none;
      border-color: #1a73e8;
      box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
    }

    .select-control:hover {
      border-color: #bbb;
    }
  `]
})
export class SelectComponent implements DynamicComponent, OnInit {
  @Input() options: Array<{ label: string; value: any }> = [];
  @Input() control: FormControl = new FormControl();
  @Input() formGroup?: FormGroup; // Add these from DynamicComponent interface
  @Input() some_Model1$M?: WritableSignal<Some_Model>;

  constructor(public changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl();
    }
  }
}