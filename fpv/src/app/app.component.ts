import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavComponent } from '../app/components/sidenav/sidenav.component';
import { LoginComponent } from './components/features/login/login.component';
import { BalanceService } from './services/balance/balance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidenavComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    protected balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    if (this.balanceService.client() === null) {
      this.router.navigate(['/login']);
    }
  }
}
