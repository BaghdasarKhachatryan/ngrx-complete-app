import * as customerActions from './auction.customers';
import { Customer } from '../customer.model';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  loaded: false,
  error: '',
};

export function customerReducer(
  state = initialState,
  action: customerActions.CustomerActions
) {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        customers: (action as customerActions.LoadCustomersSuccess).payload,
      };
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        customers: [],
      };
    }
    default: {
      return state;
    }
  }
}

export const getCustomersFeatureState =
  createFeatureSelector<CustomerState>('customers');

export const getCustomers = createSelector(
  getCustomersFeatureState,
  (state: CustomerState) => state.customers
);

export const getCustomersLoading = createSelector(
  getCustomersFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomersFeatureState,
  (state: CustomerState) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomersFeatureState,
  (state: CustomerState) => state.error
);
