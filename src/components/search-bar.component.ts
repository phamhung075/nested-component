// components/search-bar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchContent } from '../interface/dynamic-component.interface';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search-container">
      <!-- Search Results -->
      @for(result of searchResults; track result.value) {
        <div class="search-result">
          <!-- Main Info -->
          <div class="result-header">
            <i [class]="result.icon"></i>
            <a [href]="result.linkUrl">{{ result.label }}</a>
            <p>{{ result.description }}</p>
          </div>

          <!-- Checkbox -->
          <div class="checkbox-container">
            <input 
              type="checkbox" 
              [id]="result.checkboxName"
              [name]="result.checkboxName"
              [checked]="result.isChecked"
            >
            <label [for]="result.checkboxName">{{ result.checkboxLabel }}</label>
          </div>

          <!-- Card Data -->
          @if(result.cardAdditionalData) {
            <div class="card">
              <!-- Card Header -->
              <div class="card-header">
                <h3>{{ result.cardAdditionalData.cardHeader.title }}</h3>
                <p>{{ result.cardAdditionalData.cardHeader.description }}</p>
              </div>

              <!-- Card Columns -->
              <div class="card-columns">
                @for(column of result.cardAdditionalData.cardColumns; track column.title) {
                  <div class="column">
                    <h4>{{ column.title }}</h4>
                    <div [innerHTML]="column.description"></div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
    .search-container {
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .search-result {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .result-header {
      margin-bottom: 1rem;
    }

    .result-header a {
      color: #1a73e8;
      text-decoration: none;
      font-weight: 500;
      margin: 0 0.5rem;
    }

    .checkbox-container {
      margin: 0.5rem 0;
    }

    .card {
      background: #f8f9fa;
      border-radius: 4px;
      padding: 1rem;
      margin-top: 1rem;
    }

    .card-header {
      margin-bottom: 1rem;
    }

    .card-header h3 {
      margin: 0;
      color: #202124;
    }

    .card-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .column h4 {
      margin: 0 0 0.5rem 0;
      color: #202124;
    }
  `,
  ],
})
export class SearchBarComponent {
  @Input() searchResults: SearchContent[] = [];
}
