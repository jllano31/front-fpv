import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../../models/clients/Client';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private clientSubject = new BehaviorSubject<Client | null>(this.getClientFromStorage());

  get client$() {
    return this.clientSubject.asObservable();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private getClientFromStorage(): Client | null {
    if (this.isLocalStorageAvailable()) {
      const clientData = localStorage.getItem('client');
      return clientData ? JSON.parse(clientData) : null;
    }
    return null;
  }

  updateClient(client: Client): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('client', JSON.stringify(client));
      this.clientSubject.next(client);
    }
  }
}
