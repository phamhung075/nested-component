// components/nested.component.ts
import {
  Component,
  signal,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicLoaderDirective } from '../directive/dynamic-loader.directive';
import {
  DynamicComponent,
  NestedContent,
  SearchContent,
  Some_Model,
} from '../interface/dynamic-component.interface';
import { SelectComponent } from './select.example';
import { SearchBarComponent } from './search-bar.component';
import { DynamicRendererService } from '../services/dynamic-renderer.service';

@Component({
  selector: 'component-nested',
  standalone: true,
  imports: [ReactiveFormsModule, DynamicLoaderDirective, SearchBarComponent],
  template: `
    <ng-container #tempContainer></ng-container>
    <form [formGroup]="formGroup">
      <ng-template dynamicLoader></ng-template>
      <search-bar [searchResults]="searchResults"></search-bar>
    </form>
  `,
})
export class NestedComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicLoaderDirective, { static: false })
  dynamicLoader!: DynamicLoaderDirective;

  @ViewChild('tempContainer', { read: ViewContainerRef, static: true })
  tempContainer!: ViewContainerRef;

  formGroup: FormGroup;
  some_Model1$M: WritableSignal<Some_Model> = signal({
    id: 1,
    name: 'Example Model',
    status: 'active',
    data: {
      value: 'test value',
      timestamp: new Date(),
    },
  });
  searchResults: SearchContent[] = [];

  private etapeContents: NestedContent[] = [
    {
      component: SelectComponent,
      input: [
        {
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
          ],
        },
      ],
    },
  ];

  private selectControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private dynamicRenderer: DynamicRendererService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.formGroup = this.fb.group({
      select: this.selectControl,
    });
  }

  ngOnInit() {
    this.loadComponent(0);
  }

  ngAfterViewInit() {
    this.dynamicRenderer.setTempContainer(this.tempContainer);
    this.prepareSearchResults();
  }

  private async prepareSearchResults() {
    const selectHtml = this.dynamicRenderer.renderComponentToHTML(
      SelectComponent,
      {
        options: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ],
        control: this.selectControl,
        changeDetectorRef: this.changeDetectorRef,
      }
    );

    this.searchResults = [
      {
        label: 'Search Item',
        linkUrl: '/some-url',
        icon: 'icon-class',
        description: 'Main description',
        value: 'some-value',
        checkboxLabel: 'Check me',
        checkboxName: 'check1',
        isChecked: false,
        cardAdditionalData: {
          cardHeader: {
            title: 'Card Title',
            description: 'Card Description',
          },
          cardColumns: [
            {
              title: 'Dynamic Select',
              description: selectHtml,
            },
          ],
        },
      },
    ];

    this.changeDetectorRef.detectChanges();
  }

  private loadComponent(index: number) {
    if (!this.dynamicLoader) {
      console.error('Dynamic loader not initialized');
      return;
    }

    const content = this.etapeContents[index];
    if (!content?.component) {
      console.error('No component found for index:', index);
      return;
    }

    try {
      const viewContainerRef = this.dynamicLoader.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<DynamicComponent>(
        content.component
      );
      const instance = componentRef.instance;

      const parentComponent = this;

      instance.formGroup = this.formGroup;
      instance.some_Model1$M = this.some_Model1$M;

      if (content.input && Array.isArray(content.input)) {
        content.input.forEach((inputObj: Record<string, unknown>) => {
          Object.entries(inputObj).forEach(([key, value]) => {
            if (key in parentComponent) {
              const componentKey = key as keyof DynamicComponent;
              const parentValue = parentComponent[key as keyof NestedComponent];
              instance[componentKey] = parentValue;
            }
          });
        });
      }

      if (instance.changeDetectorRef) {
        instance.changeDetectorRef.detectChanges();
      } else {
        this.changeDetectorRef.detectChanges();
      }

      this.changeDetectorRef.markForCheck();
    } catch (error) {
      console.error('Error loading component:', error);
    }
  }
}
