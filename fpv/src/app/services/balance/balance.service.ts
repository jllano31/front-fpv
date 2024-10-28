import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../models/clients/Client';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  client = signal<Client | null>(null);

  updateClient(client: Client): void {
    this.client.set(client);
    localStorage.setItem('client', JSON.stringify(client));
  }
}
