import { Action, createAction, props } from '@ngrx/store';
import { Bank } from '../../bank/services/bank.service';
import { Question } from '../../bank/models/question';
import { Result } from '../../bank/models/result';
import {Test} from '../../bank/models/test';

export const GET_BANKS = '[BANKS] Banks';
export const GET_BANKS_SUCCESS = '[BANKS] Banks Success';
export const GET_BANKS_ERROR = '[BANKS] Banks Error';

export const GET_BANK_BY_ID = '[BANK] Bank';
export const GET_BANK_BY_ID_SUCCESS = '[BANK] Bank Success';
export const GET_BANK_BY_ID_ERROR = '[BANK] Bank Error';

export const GET_ALL_TEST = '[TEST] Test';
export const GET_ALL_TEST_SUCCESS = '[TEST] Test Success';
export const GET_ALL_TEST_ERROR = '[TEST] Test Error';

export const GET_BANK_QUESTIONS = '[QUESTIONS] Bank Questions';
export const GET_BANK_QUESTIONS_SUCCESS = '[QUESTIONS] Bank Questions Success';
export const GET_BANK_QUESTIONS_ERROR = '[QUESTIONS] Bank Questions Error';

export const GET_QUESTION_BY_ID = '[QUESTION] Question by Id';
export const GET_QUESTION_BY_ID_SUCCESS = '[QUESTION] Question by Id success';
export const GET_QUESTION_BY_ID_ERROR = '[QUESTION] Question by Id error';

export const UPDATE_QUESTION = '[QUESTION] Update Question';
export const UPDATE_QUESTION_SUCCESS = '[QUESTION] Update Question Success';
export const UPDATE_QUESTION_ERROR = '[QUESTION] Update Question Error';

export const DELETE_QUESTION = '[QUESTION] Delete Question';
export const DELETE_QUESTION_SUCCESS = '[QUESTION] Delete Question Success';
export const DELETE_QUESTION_ERROR = '[QUESTION] Delete Question Error';

export const GET_RESULTS_BY_USER = '[RESULTS] Get all results';
export const GET_RESULTS_BY_USER_SUCCESS = '[RESULTS] Get all results success';
export const GET_RESULTS_BY_USER_ERROR = '[RESULTS] Get all results error';

export const GET_TEST_BY_ID = '[TEST] Get test by id';
export const GET_TEST_BY_ID_SUCCESS = '[TEST] Get test by id success';
export const GET_TEST_BY_ID_ERROR = '[TEST] Get test by id Error';

export const CREATE_BANK = '[BANK] Create bank';
export const CREATE_BANK_SUCCESS = '[BANK] Create bank success';
export const CREATE_BANK_ERROR = '[BANK] Create bank error';

export const CREATE_TEST = '[TEST] Create test';
export const CREATE_TEST_SUCCESS = '[TEST] Create test success';
export const CREATE_TEST_ERROR = '[TEST] Create test error';

export class GetAllBanks implements Action {
  readonly type = GET_BANKS;
}
export class GetAllBanksSuccess implements Action {
  readonly type = GET_BANKS_SUCCESS;

  constructor(public payload: Bank[]) {}
}
export class GetAllBanksError implements Action {
  readonly type = GET_BANKS_ERROR;

  constructor(public payload: Error) {}
}
export class GetBankById implements Action {
  readonly type = GET_BANK_BY_ID;

  constructor(public payload: string) {}
}
export class GetBankByIdSuccess implements Action {
  readonly type = GET_BANK_BY_ID_SUCCESS;

  constructor(public payload: Bank) {}
}
export class GetBankByIdError implements Action {
  readonly type = GET_BANK_BY_ID_ERROR;

  constructor(public payload: Error) {}
}
export class GetAllTest implements Action {
  readonly type = GET_ALL_TEST;

  constructor(public payload: string) {}
}
export class GetAllTestSuccess implements Action {
  readonly type = GET_ALL_TEST_SUCCESS;

  constructor(public payload: Test[]) {

  }
}
export class GetAllTestError implements Action {
  readonly type = GET_ALL_TEST_ERROR;

  constructor(public payload: Error) {}
}
export class GetBankQuestions implements Action {
  readonly type = GET_BANK_QUESTIONS;

  constructor(public payload: string) {}
}
export class GetBankQuestionsSuccess implements Action {
  readonly type = GET_BANK_QUESTIONS_SUCCESS;

  constructor(public payload: Question[]) {}
}
export class GetBankQuestionsError implements Action {
  readonly type = GET_BANK_QUESTIONS_ERROR;

  constructor(public payload: Error) {}
}
export class GetQuestionById implements Action {
  readonly type = GET_QUESTION_BY_ID;

  constructor(public payload: string) {}
}
export class GetQuestionByIdSuccess implements Action {
  readonly type = GET_QUESTION_BY_ID_SUCCESS;

  constructor(public payload: Question) {}
}
export class GetQuestionByIdError implements Action {
  readonly type = GET_QUESTION_BY_ID_ERROR;

  constructor(public payload: Error) {}
}
export class UpdateQuestion implements Action {
  readonly type = UPDATE_QUESTION;

  constructor(public payload: Question) {}
}
export class UpdateQuestionSuccess implements Action {
  readonly type = UPDATE_QUESTION_SUCCESS;

  constructor(public payload: Question) {}
}
export class UpdateQuestionError implements Action {
  readonly type = UPDATE_QUESTION_ERROR;

  constructor(public payload: Error) {}
}
export class DeleteQuestion implements Action {
  readonly type = DELETE_QUESTION;

  constructor(public payload: string) {}
}
export class DeleteQuestionSuccess implements Action {
  readonly type = DELETE_QUESTION_SUCCESS;

  constructor(public payload: Question) {}
}
export class DeleteQuestionError implements Action {
  readonly type = DELETE_QUESTION_ERROR;

  constructor(public payload: Error) {}
}
export class GetAllResults implements Action {
  readonly type = GET_RESULTS_BY_USER;
}
export class GetAllResultsSuccess implements Action {
  readonly type = GET_RESULTS_BY_USER_SUCCESS;

  constructor(public payload: Result[]) {}
}
export class GetAllResultsError implements Action {
  readonly type = GET_RESULTS_BY_USER_ERROR;

  constructor(public payload: Error) {}
}
export class GetTestById implements Action {
  readonly type = GET_TEST_BY_ID;

  constructor(public payload: string) {}
}
export class GetTestByIdSuccess implements Action {
  readonly type = GET_TEST_BY_ID_SUCCESS;

  constructor(public payload: Test) {}
}
export class GetTestByIdError implements Action {
  readonly type = GET_TEST_BY_ID_ERROR;

  constructor(public payload: Error) {}
}
export class CreateBank implements Action {
  readonly type = CREATE_BANK;

  constructor(public payload: any) {}
}
export class CreateBankSuccess implements Action {
  readonly type = CREATE_BANK_SUCCESS;

  constructor(public payload: Bank) {}
}
export class CreateBankError implements Action {
  readonly type = CREATE_BANK_ERROR;

  constructor(public payload: Error) {}
}
export class CreateTest implements Action {
  readonly type = CREATE_TEST;

  constructor(public payload: any) {}
}
export class CreateTestSuccess implements Action {
  readonly type = CREATE_TEST_SUCCESS;

  constructor(public payload: Test) {}
}
export class CreateTestError implements Action {
  readonly type = CREATE_TEST_ERROR;

  constructor(public payload: Error) {}
}