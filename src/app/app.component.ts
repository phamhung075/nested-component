import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NestedComponent } from '../components/nested.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NestedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nested-component';
}
