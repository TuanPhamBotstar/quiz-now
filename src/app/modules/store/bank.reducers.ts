import { Bank } from '../bank/services/bank.service';
import { AppAction } from './app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as bankActions from './bank.actions';
import { Question } from '../bank/models/question';

export interface BankArrayState {
  banks: Bank[];
  questions: Question[];
  selected: Bank | any;
  question: Question | any;
  action: string | any;
  done: boolean;
  error?: Error | any;
}
const initialArrayState: BankArrayState = {
  banks: [],
  questions: [],
  selected: null,
  question: null,
  action: null,
  done: false,
  error: null,
};

export function reducer(state = initialArrayState, action: AppAction) {
  switch (action.type) {
    case bankActions.GET_BANKS: {
      return {
        ...state,
        action: bankActions.GET_BANKS,
        done: false,
      };
    }
    case bankActions.GET_BANKS_SUCCESS:
      return {
        ...state,
        banks: action.payload,
        done: true,
      };
    case bankActions.GET_BANKS_ERROR:
      return {
        ...state,
        error: action.payload,
        done: true,
      };
    case bankActions.GET_BANK_BY_ID:
      return {
        ...state,
        action: bankActions.GET_BANK_BY_ID,
        done: false,
      };
    case bankActions.GET_BANK_BY_ID_SUCCESS:
      return {
        ...state,
        action: bankActions.GET_BANK_BY_ID_SUCCESS,
        selected: action.payload,
        done: true,
      };
    case bankActions.GET_BANK_BY_ID_ERROR:
      return {
        ...state,
        action: bankActions.GET_BANK_BY_ID_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.GET_BANK_QUESTIONS:
      return {
        ...state,
        action: bankActions.GET_BANK_QUESTIONS,
        done: false,
      };
    case bankActions.GET_BANK_QUESTIONS_SUCCESS:
      return {
        ...state,
        action: bankActions.GET_BANK_QUESTIONS_SUCCESS,
        done: true,
        questions: action.payload,
      };
    case bankActions.GET_BANK_QUESTIONS_ERROR:
      return {
        ...state,
        action: bankActions.GET_BANK_QUESTIONS_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.GET_QUESTION_BY_ID:
      return {
        ...state,
        action: bankActions.GET_QUESTION_BY_ID,
        done: false,
      };
    case bankActions.GET_QUESTION_BY_ID_SUCCESS:
      return {
        ...state,
        action: bankActions.GET_QUESTION_BY_ID_SUCCESS,
        done: true,
        question: action.payload,
      };
    case bankActions.GET_QUESTION_BY_ID_ERROR:
      return {
        ...state,
        action: bankActions.GET_QUESTION_BY_ID_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.UPDATE_QUESTION:
      return {
        ...state,
        action: bankActions.UPDATE_QUESTION,
        done: false,
      };
    case bankActions.UPDATE_QUESTION_SUCCESS: {
      console.log(action);
      console.log(state.questions);
      let newQuestions;

      if (state.questions) {
        
        if (!action.payload.title) {
          newQuestions = state.questions.filter(question => question._id != action.payload._id);
        } else {
          const index = state.questions.findIndex(
            (h) => h._id === action.payload._id
          );
          console.log(index);
          newQuestions = [...state.questions];
          newQuestions[index] = action.payload;
        }
        
      } else newQuestions = state.questions;

      return {
        ...state,
        action: bankActions.UPDATE_QUESTION_SUCCESS,
        done: true,
        question: action.payload,
        questions: newQuestions,
      };
    }
    case bankActions.UPDATE_QUESTION_ERROR:
      return {
        ...state,
        action: bankActions.UPDATE_QUESTION_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.DELETE_QUESTION:
      return {
        ...state,
        action: bankActions.DELETE_QUESTION,
        done: false,
      };
    case bankActions.DELETE_QUESTION_SUCCESS: {
      console.log(action.payload);
      const newQuestions = state.questions.filter(
        (question) => question._id != action.payload
      );
      return {
        ...state,
        action: bankActions.DELETE_QUESTION_SUCCESS,
        done: true,
        questions: newQuestions,
      };
    }
    case bankActions.DELETE_QUESTION_ERROR: {
      return {
        ...state,
        action: bankActions.DELETE_QUESTION_ERROR,
        done: true,
        error: action.payload,
      };
    }

    default:
      return;
  }
}

export const getBankState = createFeatureSelector<BankArrayState>('banks');
export const getAllBanks = createSelector(
  getBankState,
  (state: BankArrayState) => {
    if (state) return state.banks;

    return null;
  }
);
export const getOneBank = createSelector(
  getBankState,
  (state: BankArrayState) => {
    if (state) return state.selected;

    return null;
  }
);
export const getBankQuestions = createSelector(
  getBankState,
  (state: BankArrayState) => {
    console.log(state);

    return state.questions;
  }
);
export const getOneQuestion = createSelector(
  getBankState,
  (state: BankArrayState) => {
    console.log(state);
    return state.question;
  }
);
