import { Tenant } from './tenant';

export interface CartState {
  tenants: Tenant[];
  quantity: number;
  loaded: boolean;
}
