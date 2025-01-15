# Dynamic Nested Component System

A flexible and reusable Angular component system that enables dynamic component loading with nested select controls and checkbox inputs. This system features real-time JSON output of selected values and checkbox states.

## Features

- Dynamic component loading system
- Nested search results with configurable options
- Interactive checkboxes with state management
- Dynamic select controls with customizable options
- Real-time JSON output of all selections
- Conditional display based on checkbox states

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

## Component Structure

The system consists of several key components:

### NestedComponent
The main container component that manages the overall structure and data flow.

### SearchBarComponent
Handles the display and interaction of search results, including checkboxes and select controls.

### SelectComponent
A reusable select control component that can be dynamically loaded.

### DynamicLoaderDirective
Enables dynamic component loading throughout the application.

## Usage

### Basic Setup

1. Import required modules in your app.module.ts:
```typescript
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NestedComponent } from './components/nested.component';
import { SearchBarComponent } from './components/search-bar.component';
import { SelectComponent } from './components/select-example.component';
import { DynamicLoaderDirective } from './directive/dynamic-loader.directive';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    // ... other imports
  ],
  declarations: [
    DynamicLoaderDirective
  ]
})
```

2. Add the component to your template:
```html
<component-nested></component-nested>
```

### Configuring Search Results

To configure search results, modify the prepareSearchResults method in nested.component.ts:

```typescript
private async prepareSearchResults() {
  this.searchResults = [
    {
      label: 'Your Item',
      linkUrl: '/your-url',
      icon: 'your-icon-class',
      description: 'Your description',
      value: 'unique-value',
      checkboxLabel: 'Checkbox Label',
      checkboxName: 'checkbox-name',
      isChecked: false,
      cardAdditionalData: {
        cardHeader: {
          title: 'Card Title',
          description: 'Card Description',
        },
        cardColumns: [
          {
            title: 'Dynamic Select',
            description: '',
            selectOptions: [
              { label: 'Option 1', value: 'value1' },
              { label: 'Option 2', value: 'value2' }
            ]
          },
          {
            title: 'Additional Info',
            description: 'Extra information'
          }
        ]
      }
    }
  ];
}
```

### Data Structure

Each search result item follows this structure:
```typescript
interface SearchContent {
  label: string;
  linkUrl: string;
  icon: string;
  description: string;
  value: string;
  checkboxLabel: string;
  checkboxName: string;
  isChecked: boolean;
  cardAdditionalData: {
    cardHeader: {
      title: string;
      description: string;
    };
    cardColumns: Array<{
      title: string;
      description: string;
      selectOptions?: Array<{
        label: string;
        value: any;
      }>;
    }>;
  };
}
```

### Accessing Selected Values

The component automatically generates JSON output of selected values. The output includes:
- Checkbox states for checked items
- Select control values for items with checked checkboxes
- Combined data structure showing the relationship between selections

## Styling

The component uses SCSS for styling. You can customize the appearance by modifying the styles in:
- search-bar.component.ts
- select-example.component.ts

Key style classes include:
- `.search-container`: Main container styling
- `.search-result`: Individual result item styling
- `.card`: Card container styling
- `.json-display`: JSON output display styling

## Development

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build --prod
```

## Notes

- The checkbox state controls the visibility of associated select controls and data
- JSON output is only generated for items with checked checkboxes
- Each select control maintains its own state independently
- The system uses Angular's change detection for real-time updates

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request