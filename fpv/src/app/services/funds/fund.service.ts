import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fund } from '../../models/Funds/Fund';
import { Observable } from 'rxjs';
import {environment} from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  private apiUrl = '${environment.apiUrl}/funds';

  constructor(private http: HttpClient) { }

  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  getFundById(id: string): Observable<Fund> {
    return this.http.get<Fund>(`${this.apiUrl}/${id}`);
  }
}
