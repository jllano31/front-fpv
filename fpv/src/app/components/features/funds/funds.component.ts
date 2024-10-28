import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FundService } from '../../../services/funds/fund.service';
import { Fund } from '../../../models/Funds/Fund';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Transaction } from '../../../models/transactions/transaction';
import { ClientService } from '../../../services/clients/client.service';
import { BalanceService } from '../../../services/balance/balance.service';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css',
})
export class FundsComponent implements OnInit {
  transaction: Transaction = {
    clientId: '',
    fundId: '',
    transactionType: '',
    amount: 0,
    transactionDate: new Date(),
    sendType: '',
  };
  funds: Fund[] = [];

  constructor(
    private fundService: FundService,
    private transactionService: TransactionService,
    private clientService: ClientService,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.fundService.getAllFunds().subscribe(
      (data) => {
        this.funds = data;
      },
      (error) => {
        console.error('Error al obtener los fondos:', error);
      }
    );
  }

  activeIndex = 0;

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.funds.length;
  }

  prevSlide() {
    this.activeIndex =
      (this.activeIndex - 1 + this.funds.length) % this.funds.length;
  }

  async invest(fundInvest: any) {
    const storedClient = this.balanceService.client() ?? ({} as any);
    this.transaction.clientId = storedClient.id;
    this.transaction.fundId = fundInvest.id;
    if (storedClient.availableBalance >= fundInvest.minimumInvestment) {
      const { value: investment } = await Swal.fire({
        icon: 'info',
        title: 'Ingrese el valor de inversión',
        input: 'text',
        inputLabel: 'inversión:',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Ingresa un valor!';
          }
          return null;
        },
      });
      if (investment) {
        if (
          investment > storedClient.availableBalance ||
          investment < fundInvest.minimumInvestment
        ) {
          this.insufficientBalance();
          return;
        }
        const inputOptions = new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              EMAIL: 'Email',
              SMS: 'SMS',
            });
          }, 1000);
        });
        const { value: sendType } = await Swal.fire({
          title: 'Seleccione metodo de confirmación',
          input: 'radio',
          inputOptions,
          inputValidator: (value) => {
            if (!value) {
              return 'Necesitas seleccionar alguno!';
            }
            return null;
          },
        });
        if (sendType) {
          Swal.fire(`Tu inversión es de: ${investment}`);
          this.transaction.amount = Number(investment);
          this.transaction.sendType = sendType;
          console.log(this.transaction);
          this.confirmInvestment(this.transaction);
        }
      }
    } else {
      this.insufficientBalance();
    }
  }

  confirmInvestment(transaction: Transaction) {
    this.transactionService.subscribeToFund(transaction).subscribe({
      next: (transactionResponse) => {
        const storedClient = this.balanceService.client() ?? ({} as any);
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
                confirmButtonColor: '#d33',
              });
            }
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Perfecto!!!',
          text: 'Se ha enviado la confirmación a su correo electronico.',
          confirmButtonColor: '#d33',
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Validar Back-end.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  insufficientBalance() {
    Swal.fire({
      title: 'Saldo insuficiente',
      text: 'No tienes saldo suficiente para esta inversión.',
      icon: 'warning',
      confirmButtonText: 'Ok',
    });
  }
}
