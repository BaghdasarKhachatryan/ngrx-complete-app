import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { CustomerService } from '../customer.service';
import * as customerActions from './auction.customers';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions: Actions,
    private customerService: CustomerService
  ) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions.pipe(
    ofType(customerActions.CustomerActionTypes.LOAD_CUSTOMERS),
    mergeMap((action: customerActions.LoadCustomers) =>
      this.customerService
        .getCustomers()
        .pipe(
          map(
            (customers: any) =>
              new customerActions.LoadCustomersSuccess(customers)
          )
        )
    ),
    catchError((err: any) => of(new customerActions.LoadCustomersFail(err)))
  );
}
