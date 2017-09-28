import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ninja Belts';
  name = 'ninja';
  ninja = {
    name: 'Ryu',
    belt: 'Red'
  }
}
