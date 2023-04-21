import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'sqlite',
    },
    {
      name: 'sqlite-quick',
    },
    {
      name: 'sqlite-requery',
    },
    {
      name: 'sqlite-sqlcipher',
    },
  ];
}
