import { Injectable } from '@angular/core';
import { Transaction } from '../../models/transactions/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl =
    'http://ec2-54-226-140-102.compute-1.amazonaws.com:8080/api/transactions';

  constructor(private http: HttpClient) {}

  subscribeToFund(transaction: Transaction): Observable<Transaction> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Transaction>(
      `${this.apiUrl}/subscribe`,
      transaction,
      { headers }
    );
  }

  getTransactionsByClientId(clientId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/client/${clientId}`);
  }

  cancelSubscription(id: string): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/cancel/${id}`, {});
  }
}
