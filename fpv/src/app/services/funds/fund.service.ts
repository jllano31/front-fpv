import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fund } from '../../models/Funds/Fund';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FundService {
  private apiUrl =
    'http://ec2-54-226-140-102.compute-1.amazonaws.com:8080/api/funds';

  constructor(private http: HttpClient) {}

  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  getFundById(id: string): Observable<Fund> {
    return this.http.get<Fund>(`${this.apiUrl}/${id}`);
  }
}
