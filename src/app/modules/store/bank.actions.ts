import { Action, createAction, props } from '@ngrx/store';
import { Bank } from '../bank/services/bank.service';
import { Question } from '../bank/models/question';

export const GET_BANKS = '[BANKS] Banks';
export const GET_BANKS_SUCCESS = '[BANKS] Banks Success';
export const GET_BANKS_ERROR = '[BANKS] Banks Error';

export const GET_BANK_BY_ID = '[BANK] Bank';
export const GET_BANK_BY_ID_SUCCESS = '[BANK] Bank Success';
export const GET_BANK_BY_ID_ERROR = '[BANK] Bank Error';

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