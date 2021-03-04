import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BankService } from '../../bank/services/bank.service';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as bankActions from './bank.actions';
import { ResultService } from '../../result/services/result.service';
import { TestService } from '../../test/services/test.service';

@Injectable()
export class BankEffects {
  constructor(
    private actions$: Actions,
    private bankService: BankService,
    private resultService: ResultService,
    private testService: TestService
  ) {}
  @Effect()
  getAllBanks$ = this.actions$.pipe(
    ofType(bankActions.GET_BANKS),
    map((action: bankActions.GetAllBanks) => {
      return action.payload;
    }),
    switchMap((payload) => {
      return this.bankService.getBanks(payload.page);
    }),
    map((res) => {
      return new bankActions.GetAllBanksSuccess(res.data);
    }),
    catchError((err) => [new bankActions.GetAllBanksError(err)])
  );
  @Effect()
  createBank$ = this.actions$.pipe(
    ofType(bankActions.CREATE_BANK),
    map((action: bankActions.CreateBank) => {
      return action.payload;
    }),
    switchMap((newBank) => this.bankService.createBank(newBank)),
    map((newBank) => {
      return new bankActions.CreateBankSuccess(newBank.data);
    }),
    catchError((err) => [new bankActions.CreateBankError(err)])
  );
  @Effect()
  deleteBank$ = this.actions$.pipe(
    ofType(bankActions.DELETE_BANK_BY_ID),
    map((action: bankActions.DeleteBank) => {
      return action.payload;
    }),
    switchMap((id) => this.bankService.deleteBank(id)),
    map((res) => {
      return new bankActions.DeleteBankSuccess(res.data);
    }),
    catchError((err) => [new bankActions.DeleteBankError(err)])
  );
  @Effect()
  getBank$ = this.actions$.pipe(
    ofType(bankActions.GET_BANK_BY_ID),
    map((action: bankActions.GetBankById) => {
      return action.payload;
    }),
    switchMap((id) => this.bankService.getBankInfo(id)),
    map((bank) => {
      console.log(bank);
      return new bankActions.GetBankByIdSuccess(bank.data);
    }),
    catchError((err) => [new bankActions.GetBankByIdError(err)])
  );
  @Effect()
  getBankQuestions$ = this.actions$.pipe(
    ofType(bankActions.GET_BANK_QUESTIONS),
    map((action: bankActions.GetBankQuestions) => action.payload),
    switchMap((info) => {
      console.log(info)
      return this.bankService.getBankQuestions(info);
    }),
    map((questions) => {
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
  addQuestion$ = this.actions$.pipe(
    ofType(bankActions.ADD_QUESTION),
    map((action: bankActions.AddQuestion) => action.payload),
    switchMap((question) => this.bankService.addQuestion(question)),
    map((question) => new bankActions.AddQuestionSuccess(question.data)),
    catchError((err) => [new bankActions.AddQuestionError(err)])
  );
  @Effect()
  updateQuestion$ = this.actions$.pipe(
    ofType(bankActions.UPDATE_QUESTION),
    map((action: bankActions.UpdateQuestion) => action.payload),
    switchMap((question) => this.bankService.updateQuestion(question)),
    map((question) => {
      return new bankActions.UpdateQuestionSuccess(question.data);
    }),
    catchError((err) => [new bankActions.UpdateQuestionError(err)])
  );
  @Effect()
  getResultsByUser$ = this.actions$.pipe(
    ofType(bankActions.GET_RESULTS_BY_USER),
    map((action: bankActions.GetAllResults) => action.payload),
    switchMap((page) => {
      return this.resultService.getResultsByIdUser(page);
    }),
    map((results) => {
      console.log(results);

      return new bankActions.GetAllResultsSuccess(results.data);
    }),
    catchError((err) => [new bankActions.GetAllResultsError(err)])
  );
  @Effect()
  getTestById$ = this.actions$.pipe(
    ofType(bankActions.GET_TEST_BY_ID),
    map((action: bankActions.GetTestById) => {
      return action.payload;
    }),
    switchMap((id) => {
      return this.testService.getTestById(id);
    }),
    map((res) => {
      return new bankActions.GetTestByIdSuccess(res.data);
    }),
    catchError((err) => [new bankActions.GetTestByIdError(err)])
  );
  @Effect()
  getAllTest$ = this.actions$.pipe(
    ofType(bankActions.GET_ALL_TEST),
    map((action: bankActions.GetAllTest) => {
      return action.payload;
    }),
    switchMap((res) => {
      console.log(res);
      return this.testService.getAllTest(res);
    }),
    map((res) => {
      console.log(res);
      return new bankActions.GetAllTestSuccess(res.data);
    }),
    catchError((err) => [new bankActions.GetAllTestError(err)])
  );
  @Effect()
  createTest$ = this.actions$.pipe(
    ofType(bankActions.CREATE_TEST),
    map((action: bankActions.CreateTest) => {
      return action.payload;
    }),
    switchMap((test) => {
      return this.testService.createTest(test);
    }),
    map((res) => {
      return new bankActions.CreateTestSuccess(res.data);
    }),
    catchError((err) => [new bankActions.CreateTestError(err)])
  );
  @Effect()
  updateBank$ = this.actions$.pipe(
    ofType(bankActions.UPDATE_BANK_BY_ID),
    map((action: bankActions.UpdateBankById) => {
      return action.payload
    }),
    switchMap((bank) => {
      return this.bankService.updateBank(bank.id, bank.title);
    }),
    map((res ) => {
      return new bankActions.UpdateBankByIdSuccess(res.data)
    }),
    catchError((err) => [new bankActions.UpdateBankByIdError(err)])
  )
}
