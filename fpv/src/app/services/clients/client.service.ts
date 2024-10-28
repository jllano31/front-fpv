import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/clients/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl =
    'http://ec2-54-226-140-102.compute-1.amazonaws.com:8080/api/clients';

  constructor(private http: HttpClient) {}

  getClientByUsername(username: string): Observable<any> {
    return this.http.get<Client>(`${this.apiUrl}/user/${username}`);
  }
}
