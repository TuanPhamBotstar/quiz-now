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
      return this.bankService.getBanks();
    }),
    map((res) => {
      console.log(res.data);
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
    catchError((err) => [new bankActions.GetBankByIdError(err)])
  );
  @Effect()
  getBankQuestions$ = this.actions$.pipe(
    ofType(bankActions.GET_BANK_QUESTIONS),
    map((action: bankActions.GetBankQuestions) => action.payload),
    switchMap((id) => this.bankService.getBankQuestions(id)),
    map((questions) => {
      console.log(questions);
      return new bankActions.GetBankQuestionsSuccess(questions.data);
    }),
    catchError((err) => [new bankActions.GetBankQuestionsError(err)])
  );
  @Effect()
  getQuestion$ = this.actions$.pipe(
    ofType(bankActions.GET_QUESTION_BY_ID),
    map((action: bankActions.GetQuestionById) => action.payload),
    switchMap((id) => this.bankService.getQuestion(id)),
    map((question) => {
      console.log(question);

      return new bankActions.GetQuestionByIdSuccess(question.data);
    }),
    catchError((error) => [new bankActions.GetQuestionByIdError(error)])
  );
  @Effect()
  updateQuestion$ = this.actions$.pipe(
    ofType(bankActions.UPDATE_QUESTION),
    map((action: bankActions.UpdateQuestion) => action.payload),
    switchMap((question) => this.bankService.updateQuestion(question)),
    map((question) => {
      console.log(question);

      return new bankActions.UpdateQuestionSuccess(question.data);
    }),
    catchError((err) => [new bankActions.UpdateQuestionError(err)])
  )
}
