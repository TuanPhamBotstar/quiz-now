import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BankService } from '../bank/services/bank.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as bankActions from './bank.actions';

@Injectable()
export class BankEffects {
  constructor(private actions$: Actions, private bankService: BankService) {}
  @Effect()
  getAllBanks$ = this.actions$.pipe(
    ofType(bankActions.GET_BANKS),
    switchMap(() => {
      console.log('hello');
      return this.bankService.getBanks();
    }),
    map((res) => {
      console.log('effect', res.data);
      return new bankActions.GetAllBanksSuccess(res.data);
    }),
    catchError((err) => [new bankActions.GetAllBanksError(err)])
  );
  @Effect()
  getBank$ = this.actions$.pipe(
      ofType(bankActions.GET_BANK_BY_ID),
      map((action: bankActions.GetBankById) => {
          return action.payload;
      }),
      switchMap((id) => this.bankService.getBankInfo(id)),
      map((bank) => {
          return new bankActions.GetBankByIdSuccess(bank.data);
      }),
      catchError(err => [new bankActions.GetBankByIdError(err)])
  )
}
