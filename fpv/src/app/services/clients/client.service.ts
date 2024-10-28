import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/clients/Client';
import {environment} from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = '${environment.apiUrl}/clients';

  constructor(private http: HttpClient) {}

  getClientByUsername(username: string): Observable<any> {
    return this.http.get<Client>(`${this.apiUrl}/user/${username}`);
  }
}
