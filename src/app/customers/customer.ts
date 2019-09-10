export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  invoice?: any[];
  user?: any;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
}
