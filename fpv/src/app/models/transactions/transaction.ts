export interface Transaction {
  id?: string;
  clientId: string;
  fundId: string;
  transactionType: string;
  amount: number;
  transactionDate: Date;
  sendType: string;
}
