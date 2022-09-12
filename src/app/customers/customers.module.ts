import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { StoreModule } from '@ngrx/store';
import { customerReducer } from './state/reducer.customers';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect } from './state/effects.customers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forFeature([CustomerEffect]),
    StoreModule.forFeature('customers', customerReducer),
    CustomersRoutingModule,
  ],
})
export class CustomersModule {}
