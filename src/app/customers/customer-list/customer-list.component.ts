import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import * as customerActions from '../state/auction.customers';
import {
  AppState,
  getCustomers,
  getCustomersError,
} from '../state/reducer.customers';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers$!: Observable<Customer[]>;
  error$!: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.select(getCustomers);
    this.error$ = this.store.select(getCustomersError);
  }
  deleteCustomer(customer: Customer) {
    if (confirm('Are You Sure You want to Delete the User?')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id!));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id!));
  }
}
