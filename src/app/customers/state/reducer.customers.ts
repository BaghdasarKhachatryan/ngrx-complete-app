import * as customerActions from './auction.customers';
import { Customer } from '../customer.model';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter();

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loaded: false,
  loading: false,
  error: '',
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

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
      return customerAdapter.setAll(
        (action as customerActions.LoadCustomersSuccess).payload,
        {
          ...state,
          loaded: true,
          loading: false,
        }
      );
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        entities: {},
      };
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(
        (action as customerActions.LoadCustomerSuccess).payload,
        {
          ...state,
          selectedCustomerId: (action as customerActions.LoadCustomerSuccess)
            .payload.id,
        }
      );
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
      };
    }
    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(
        (action as customerActions.CreateCustomerSuccess).payload,
        state
      );
    }
    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
      };
    }
    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(
        (action as customerActions.UpdateCustomerSuccess).payload,
        state
      );
    }
    case customerActions.CustomerActionTypes.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
      };
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(
        (action as customerActions.DeleteCustomerSuccess).payload,
        state
      );
    }
    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAIL: {
      return {
        ...state,
        entities: {},
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
  customerAdapter.getSelectors().selectAll
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

export const getCurrentCustomerId = createSelector(
  getCustomersFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);
export const getCurrentCustomer = createSelector(
  getCustomersFeatureState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId!]
);
