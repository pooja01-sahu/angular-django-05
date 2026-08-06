import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar';
import { ServerStatusServices } from './services/server-status.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ors');
  serverStatus = inject(ServerStatusServices);
   reload() {
    window.location.reload();
  }
}
