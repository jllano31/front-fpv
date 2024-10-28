import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Transaction } from '../../../models/transactions/transaction';
import { TransactionService } from '../../../services/transaction/transaction.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Fund } from '../../../models/Funds/Fund';
import { FundService } from '../../../services/funds/fund.service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/clients/client.service';
import { BalanceService } from '../../../services/balance/balance.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit{
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-amount', 'demo-action'];
  dataSource = new MatTableDataSource<Transaction>();;
  transactionForm: FormGroup;
  fund: Fund | null = null;

  constructor(
    private transactionService: TransactionService,
    private fundService: FundService, 
    private clientService: ClientService,
    private balanceService: BalanceService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      transactionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    if (typeof localStorage !== 'undefined') {
      const storedClient = JSON.parse(localStorage.getItem('client') || '{}');
      this.transactionService.getTransactionsByClientId(storedClient.id).subscribe(
        (transactions) => {
          const filteredTransactions = transactions.filter(
            (transaction) => transaction.transactionType === 'subscription'
          ).map((transaction, index) => ({ ...transaction, position: index + 1 }));
          this.dataSource.data = filteredTransactions;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el servidor',
            text: 'Error al obtener las transacciones.',
            confirmButtonColor: '#d33'
          });
        }
      );    
    } else {
        console.warn('localStorage no está disponible');
    }
  }

  cancelSubscription(id: string): void {
    console.log(id);
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción cancelará la suscripción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.cancelSubscription(id).subscribe(
          () => {
            Swal.fire('Cancelado', 'La suscripción ha sido cancelada.', 'success');
            const storedClient = JSON.parse(localStorage.getItem('client') || '{}');
            const username = storedClient.userName;
            this.clientService.getClientByUsername(username).subscribe({
              next: (client) => {
                this.balanceService.updateClient(client);
              },
              error: (error) => {
                  if (error.status === 404) {
                      Swal.fire({
                          icon: 'error',
                          title: 'Usuario no encontrado',
                          text: 'El nombre de usuario que ingresaste no existe.',
                          confirmButtonColor: '#d33'
                      });
                    }
                }
            });
            this.loadTransactions();
          },
          (error) => {
            console.error('Error al cancelar la suscripción:', error);
            Swal.fire('Error', 'No se pudo cancelar la suscripción.', 'error');
          }
        );
      }
    });
  }

  searchTransation(): void {
    if (this.transactionForm.valid) {
      const transactionId = this.transactionForm.value.transactionId;
      this.searchFundById(transactionId);
    }
  }

  searchFundById(id: string): void {
    this.fundService.getFundById(id).subscribe(
      (fund) => {
        this.fund = fund;
      },
      (error) => {
        console.error('Error al obtener el fondo:', error);
        this.fund = null;
      }
    );
  }
}
