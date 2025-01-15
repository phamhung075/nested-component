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
  SelectOption
} from '../interface/dynamic-component.interface';
import { SearchBarComponent } from './search-bar.component';
import { DynamicRendererService } from '../services/dynamic-renderer.service';
import { SelectComponent } from './select-example.component';

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
  @ViewChild(DynamicLoaderDirective) 
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

  private nestedContent: NestedContent[] = [
    {
      component: SelectComponent,
      input: [
        {
          options: [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
          ] as SelectOption[],
        },
      ],
    },
  ];

  private selectControl: FormControl = new FormControl('');

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
    this.formGroup = this.fb.group({
      select: this.selectControl
    });
  }

  ngAfterViewInit() {
  Promise.resolve().then(() => {
      if (this.tempContainer) {
        this.dynamicRenderer.setTempContainer(this.tempContainer);
      }
      
      // Load component after dynamic loader is available
      if (this.dynamicLoader) {
        this.loadComponent(0);
      }

      this.prepareSearchResults().then(() => {
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  private async prepareSearchResults() {  
    try {
      this.searchResults = [
        {
          label: 'Project Management Dashboard',
          linkUrl: '/projects/dashboard',
          icon: 'fas fa-project-diagram',
          description: 'Comprehensive project management dashboard with real-time updates and team collaboration features',
          value: 'project-dash',
          checkboxLabel: 'Enable notifications',
          checkboxName: 'project-notifications',
          isChecked: true,
          cardAdditionalData: {
            cardHeader: {
              title: 'Project Settings',
              description: 'Configure your project dashboard preferences and team access',
            },
            cardColumns: [
              {
                title: 'Dynamic Select',
                description: '',
                selectOptions: [
                  { label: 'Team Lead View', value: 'lead' },
                  { label: 'Developer View', value: 'dev' },
                  { label: 'Stakeholder View', value: 'stakeholder' },
                  { label: 'Custom View', value: 'custom' }
                ]
              },
              {
                title: 'Active Features',
                description: 'Gantt charts, Resource allocation, Sprint planning'
              }
            ]
          }
        },
        {
          label: 'Analytics Suite',
          linkUrl: '/analytics',
          icon: 'fas fa-chart-line',
          description: 'Advanced analytics tools for data visualization and business intelligence',
          value: 'analytics',
          checkboxLabel: 'Enable real-time updates',
          checkboxName: 'analytics-updates',
          isChecked: false,
          cardAdditionalData: {
            cardHeader: {
              title: 'Analytics Configuration',
              description: 'Customize your analytics dashboard and reporting preferences',
            },
            cardColumns: [
              {
                title: 'Dynamic Select',
                description: '',
                selectOptions: [
                  { label: 'Daily Reports', value: 'daily' },
                  { label: 'Weekly Summary', value: 'weekly' },
                  { label: 'Monthly Analysis', value: 'monthly' },
                  { label: 'Custom Period', value: 'custom' }
                ]
              },
              {
                title: 'Available Metrics',
                description: 'User engagement, Conversion rates, Revenue tracking'
              }
            ]
          }
        },
        {
          label: 'User Management Portal',
          linkUrl: '/users/manage',
          icon: 'fas fa-users-cog',
          description: 'Centralized user management system with role-based access control',
          value: 'user-mgmt',
          checkboxLabel: 'Enable audit logging',
          checkboxName: 'audit-log',
          isChecked: true,
          cardAdditionalData: {
            cardHeader: {
              title: 'User Access Controls',
              description: 'Manage user permissions and security settings',
            },
            cardColumns: [
              {
                title: 'Dynamic Select',
                description: '',
                selectOptions: [
                  { label: 'Admin Access', value: 'admin' },
                  { label: 'Manager Access', value: 'manager' },
                  { label: 'User Access', value: 'user' },
                  { label: 'Guest Access', value: 'guest' }
                ]
              },
              {
                title: 'Security Features',
                description: '2FA, Session management, Access logs'
              }
            ]
          }
        },
        {
          label: 'Resource Scheduler',
          linkUrl: '/scheduler',
          icon: 'fas fa-calendar-alt',
          description: 'Interactive resource scheduling and allocation management system',
          value: 'scheduler',
          checkboxLabel: 'Enable conflict detection',
          checkboxName: 'conflict-detection',
          isChecked: false,
          cardAdditionalData: {
            cardHeader: {
              title: 'Scheduler Settings',
              description: 'Configure resource allocation and scheduling preferences',
            },
            cardColumns: [
              {
                title: 'Dynamic Select',
                description: '',
                selectOptions: [
                  { label: 'Hourly View', value: 'hourly' },
                  { label: 'Daily View', value: 'daily' },
                  { label: 'Weekly View', value: 'weekly' },
                  { label: 'Monthly View', value: 'monthly' }
                ]
              },
              {
                title: 'Scheduling Features',
                description: 'Auto-allocation, Conflict resolution, Resource optimization'
              }
            ]
          }
        },
        {
          label: 'Document Management',
          linkUrl: '/documents',
          icon: 'fas fa-file-alt',
          description: 'Comprehensive document management system with version control',
          value: 'doc-mgmt',
          checkboxLabel: 'Enable version control',
          checkboxName: 'version-control',
          isChecked: true,
          cardAdditionalData: {
            cardHeader: {
              title: 'Document Controls',
              description: 'Configure document handling and sharing settings',
            },
            cardColumns: [
              {
                title: 'Dynamic Select',
                description: '',
                selectOptions: [
                  { label: 'Public Access', value: 'public' },
                  { label: 'Team Access', value: 'team' },
                  { label: 'Private Access', value: 'private' },
                  { label: 'Custom Access', value: 'custom' }
                ]
              },
              {
                title: 'Document Features',
                description: 'Version history, Collaboration tools, Access tracking'
              }
            ]
          }
        }
      ];
      
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error preparing search results:', error);
    }
  };
      


  private loadComponent(index: number) {
    if (!this.dynamicLoader) {
      console.error('Dynamic loader not initialized');
      return;
    }

    const content = this.nestedContent[index];
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
      
      if (instance instanceof SelectComponent) {
        instance.control = this.selectControl;
        instance.options = content.input?.[0]['options'] || [];
      }

      // Set core properties
      instance.formGroup = this.formGroup;
      instance.some_Model1$M = this.some_Model1$M;

      // Handle input options
      if (content.input?.[0]['options']) {
        instance['options'] = content.input[0]['options'];
      }

      // Set control
      if (instance['control'] === undefined) {
        instance['control'] = this.selectControl;
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