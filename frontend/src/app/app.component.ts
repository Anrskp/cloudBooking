import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <nav>
       <a routerLink="/dashboard">Dashboard</a>
     </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'webApp';
}
