import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-800">FetchIt Admin</h1>
            </div>
            <div class="flex items-center space-x-4">
              <a routerLink="/main/dashboard" class="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a routerLink="/logout" class="text-red-600 hover:text-red-800">Logout</a>
            </div>
          </div>
        </div>
      </nav>
      
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './main.component.css',
  standalone: true
})
export class MainComponent {

}
