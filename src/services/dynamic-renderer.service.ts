import {
  Injectable,
  ViewContainerRef,
  Type,
  ComponentRef,
} from '@angular/core';
import { DynamicComponent } from '../interface/dynamic-component.interface';

@Injectable({
  providedIn: 'root',
})
export class DynamicRendererService {
  private tempContainer: ViewContainerRef | null = null;

  setTempContainer(container: ViewContainerRef) {
    this.tempContainer = container;
  }

  renderComponentToHTML<T extends DynamicComponent>(
    component: Type<T>,
    inputs: Partial<T> = {}
  ): string {
    if (!this.tempContainer) {
      throw new Error('Temporary container not initialized');
    }

    const componentRef = this.tempContainer.createComponent<T>(component);
    const instance = componentRef.instance;

    Object.assign(instance, inputs);

    if (instance.changeDetectorRef) {
      instance.changeDetectorRef.detectChanges();
    }

    const element = componentRef.location.nativeElement;
    const html = element.outerHTML;

    componentRef.destroy();
    this.tempContainer.clear();

    return html;
  }
}
