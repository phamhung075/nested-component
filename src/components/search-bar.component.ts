import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccumulatedData, CheckboxData, SearchContent } from '../interface/dynamic-component.interface';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectComponent } from './select-example.component';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SelectComponent],
  template: `
    <div class="search-container">
      @for(result of searchResults; track result.value) {
        <div class="search-result">
          <!-- Main Result Content -->
          <div class="result-header">
            <i class="icon" [class]="result.icon"></i>
            <div class="header-content">
              <a [href]="result.linkUrl" class="result-link">{{ result.label }}</a>
              <p class="result-description">{{ result.description }}</p>
            </div>
          </div>

          <!-- Checkbox Section -->
          <div class="checkbox-container">
            <label class="custom-checkbox">
              <input
                type="checkbox"
                class="checkbox"
                [name]="result.checkboxName"
                [(ngModel)]="result.isChecked"
                (ngModelChange)="onCheckboxChange(result)"
              >
              <span class="checkmark"></span>
            </label>
            <span class="checkbox-label">{{ result.checkboxLabel }}</span>
          </div>

          <!-- JSON Display for Checkbox -->
          <pre class="json-display">{{ getCheckboxJSON(result) }}</pre>

          <!-- Card Data -->
          @if(result.cardAdditionalData) {
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">{{ result.cardAdditionalData.cardHeader.title }}</h3>
                <p class="card-subtitle">{{ result.cardAdditionalData.cardHeader.description }}</p>
              </div>

              <div class="card-columns">
                @for(column of result.cardAdditionalData.cardColumns; track column.title) {
                  <div class="column">
                    <h4 class="column-title">{{ column.title }}</h4>
                    @if(column.title === 'Dynamic Select' && column.selectOptions) {
                      <app-select 
                        [options]="column.selectOptions"
                        [control]="getSelectControl(result.value + '-' + column.title)">
                      </app-select>

                      <!-- JSON Display for Selected Value -->
                      <pre class="json-display">{{ getSelectedValueJSON(result.value + '-' + column.title) }}</pre>

                    } @else {
                      <div class="column-content">{{ column.description }}</div>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- Overall Selected Values Display -->
      <div class="overall-json">
        <h3>All Values:</h3>
        <pre>{{ getAllValuesJSON() }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 1.5rem;
      max-width: 1000px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    .search-result {
      border: 1px solid #e8eaed;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.25rem;
      background: #ffffff;
      transition: box-shadow 0.2s ease;
    }

    .result-header {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .header-content {
      flex: 1;
    }

    .icon {
      font-size: 1.25rem;
      color: #1a73e8;
      flex-shrink: 0;
      margin-top: 0.25rem;
    }

    .result-link {
      display: inline-block;
      color: #1a73e8;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      margin-bottom: 0.25rem;
      border-bottom: 2px solid transparent;
      transition: border-color 0.2s ease;
    }

    .result-link:hover {
      border-bottom-color: #1a73e8;
    }

    .result-description {
      margin: 0;
      color: #5f6368;
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 1rem 0;
      padding: 0.5rem 0;
    }

    .custom-checkbox {
      position: relative;
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
      margin: 0;
      z-index: 1;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      background-color: #ffffff;
      border: 2px solid #5f6368;
      border-radius: 3px;
      transition: all 0.2s ease;
    }

    .checkbox:checked + .checkmark {
      background-color: #1a73e8;
      border-color: #1a73e8;
    }

    .checkbox:checked + .checkmark:after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .checkbox-label {
      color: #202124;
      font-size: 0.9375rem;
      user-select: none;
    }

    .card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1.5rem;
      margin-top: 1.25rem;
    }

    .card-header {
      margin-bottom: 1.5rem;
    }

    .card-title {
      margin: 0;
      color: #202124;
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: -0.01em;
    }

    .card-subtitle {
      margin: 0.5rem 0 0;
      color: #5f6368;
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .card-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
    }

    .column {
      background: #ffffff;
      border-radius: 6px;
      padding: 1.25rem;
      border: 1px solid #e8eaed;
    }

    .column-title {
      margin: 0 0 0.75rem;
      color: #202124;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: -0.01em;
    }

    .column-content {
      color: #5f6368;
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    .json-display {
      margin-top: 1rem;
      padding: 0.75rem;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 0.875rem;
      font-family: monospace;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .overall-json {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e8eaed;
    }

    .overall-json h3 {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      color: #202124;
    }

    .overall-json pre {
      margin: 0;
      padding: 1rem;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e8eaed;
      font-size: 0.875rem;
      font-family: monospace;
      white-space: pre-wrap;
      word-break: break-all;
    }
  `]
})
export class SearchBarComponent implements OnInit {
  @Input() searchResults: SearchContent[] = [];
  private selectControls: Map<string, FormControl> = new Map();
  selectedValues: { [key: string]: any } = {};
  checkboxValues: { [key: string]: CheckboxData } = {};

  constructor() {}

  ngOnInit() {
    // Initialize the form controls and subscribe to their value changes
    this.searchResults.forEach(result => {
      // Initialize checkbox values
      this.checkboxValues[result.value] = {
        isChecked: result.isChecked,
        checkboxLabel: result.checkboxLabel,
        checkboxName: result.checkboxName
      };

      result.cardAdditionalData.cardColumns.forEach(column => {
        if (column.title === 'Dynamic Select' && column.selectOptions) {
          const controlKey = result.value + '-' + column.title;
          const control = new FormControl();
          this.selectControls.set(controlKey, control);
          
          control.valueChanges.subscribe(value => {
            this.selectedValues[controlKey] = value;
          });
        }
      });
    });
  }

  onCheckboxChange(result: SearchContent) {
    this.checkboxValues[result.value] = {
      isChecked: result.isChecked,
      checkboxLabel: result.checkboxLabel,
      checkboxName: result.checkboxName
    };
  }

  getCheckboxJSON(result: SearchContent): string {
    return JSON.stringify({
      value: result.value,
      checkboxName: result.checkboxName,
      checkboxLabel: result.checkboxLabel,
      isChecked: result.isChecked
    }, null, 2);
  }

  getSelectControl(key: string): FormControl {
    if (!this.selectControls.has(key)) {
      const control = new FormControl();
      this.selectControls.set(key, control);
      
      control.valueChanges.subscribe(value => {
        this.selectedValues[key] = value;
      });
    }
    return this.selectControls.get(key)!;
  }

  getSelectedValueJSON(key: string): string {
    const control = this.selectControls.get(key);
    if (!control) return '{}';

    const value = control.value;
    const selectedOption = this.searchResults
      .find(result => result.cardAdditionalData.cardColumns
        .some(column => column.selectOptions?.some(opt => opt.value === value)))
      ?.cardAdditionalData.cardColumns
      .find(column => column.selectOptions?.some(opt => opt.value === value))
      ?.selectOptions?.find(opt => opt.value === value);

    return JSON.stringify({ 
      selectedValue: value,
      selectedOption
    }, null, 2);
  }

  getAllValuesJSON(): string {
    const checkedItems = Object.entries(this.checkboxValues)
      .filter(([_, value]) => value.isChecked)
      .reduce<AccumulatedData>((acc, [key, value]) => {
        // Get the corresponding select value for this checked item
        const selectKey = `${key}-Dynamic Select`;
        const selectControl = this.selectControls.get(selectKey);
        const selectValue = selectControl?.value;

        // Get the result details
        const result = this.searchResults.find(r => r.value === key);
        const selectedOption = result?.cardAdditionalData.cardColumns
          .find(column => column.selectOptions?.some(opt => opt.value === selectValue))
          ?.selectOptions?.find(opt => opt.value === selectValue);

        // Only include if there's a checkbox value or select value
        if (value.isChecked || selectValue) {
          acc[key] = {
            label: result?.label,
            checkbox: {
              isChecked: value.isChecked,
              checkboxLabel: value.checkboxLabel,
              checkboxName: value.checkboxName
            },
            ...(selectValue && {
              select: {
                selectedValue: selectValue,
                selectedOption
              }
            })
          };
        }
        return acc;
      }, {});

    return Object.keys(checkedItems).length > 0 
      ? JSON.stringify(checkedItems, null, 2)
      : '{}';
  }
}