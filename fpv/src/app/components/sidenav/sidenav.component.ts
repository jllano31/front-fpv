import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet} from '@angular/router';
import { BalanceService } from '../../services/balance/balance.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
  availableBalance: number | null = null;
constructor(
  private localStorageService: BalanceService
){}

ngOnInit(): void {
  this.localStorageService.client$.subscribe((client) => {
    this.availableBalance = client?.availableBalance ?? null;
  });
}
}
