import { Fund } from '../Funds/Fund';

export interface Client {
  id: string;
  name: string;
  availableBalance: number;
  subscribedFunds: Array<Fund>;
  email: string;
  phoneNumber: string;
  userName: string;
}
