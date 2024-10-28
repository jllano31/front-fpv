import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { SidenavComponent } from '../app/components/sidenav/sidenav.component';
import { LoginComponent } from './components/features/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidenavComponent,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isLoginPage = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.isLoginPage = this.router.url === '/login';

    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}
