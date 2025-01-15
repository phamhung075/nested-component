import { Type, ChangeDetectorRef, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Some_Model {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  data?: {
    value: string;
    timestamp: Date;
  };
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface CardColumn {
  title: string;
  description: string;
  selectOptions?: SelectOption[];
}

export interface CardAdditionalData {
  cardHeader: {
    title: string;
    description: string;
  };
  cardColumns: CardColumn[];
}

export interface SearchContent {
  label: string;
  linkUrl: string;
  icon: string;
  description: string;
  value: string;
  checkboxLabel: string;
  checkboxName: string;
  isChecked: boolean;
  cardAdditionalData: CardAdditionalData;
}

export interface DynamicComponent {
  formGroup?: FormGroup;
  some_Model1$M?: WritableSignal<Some_Model>;
  changeDetectorRef?: ChangeDetectorRef;
  [key: string]: any;
}

export interface NestedContent {
  title?: string;
  description?: string;
  component: Type<DynamicComponent>;
  input: Array<{ [key: string]: any }>;
}

export interface SearchContent {
  label: string;
  linkUrl: string;
  icon: string;
  description: string;
  value: string;
  checkboxLabel: string;
  checkboxName: string;
  isChecked: boolean;
  cardAdditionalData: CardAdditionalData;
}

export interface CheckboxData {
  isChecked: boolean;
  checkboxLabel: string;
  checkboxName: string;
}

export interface SelectData {
  selectedValue: any;
  selectedOption?: {
    label: string;
    value: any;
  };
}

export interface ResultData {
  label?: string;
  checkbox: CheckboxData;
  select?: SelectData;
}

export interface AccumulatedData {
  [key: string]: ResultData;
}

