import { Bank } from '../../bank/services/bank.service';
import { AppAction } from '../app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as bankActions from './bank.actions';
import { Question } from '../../bank/models/question';
import { Result } from '../../bank/models/result';
import { Test } from '../../bank/models/test';

export interface BankArrayState {
  banks: Bank[];
  selected: Bank | any;
  questions: Question[];
  question: Question | any;
  results: Result | any;
  tests: Test[];
  test: Test | any;
  action: string | any;
  done: boolean;
  error?: Error | any;
  limitItemsQuestion: number;
  limitItemsBank: number;
}
const initialArrayState: BankArrayState = {
  banks: [],
  selected: null,
  questions: [],
  question: null,
  results: [],
  tests: [],
  test: null,
  action: null,
  done: false,
  error: null,
  limitItemsQuestion: 0,
  limitItemsBank: 0,
};

export function reducer(state = initialArrayState, action: AppAction) {
  switch (action.type) {
    case bankActions.GET_BANKS: {
      return {
        ...state,
        action: bankActions.GET_BANKS,
        done: false,
        limitItemsBank: action.payload.limitItems,
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
    case bankActions.GET_ALL_TEST:
      return {
        ...state,
        action: bankActions.GET_ALL_TEST,
        done: false,
      };
    case bankActions.GET_ALL_TEST_SUCCESS:
      return {
        ...state,
        action: bankActions.GET_ALL_TEST_SUCCESS,
        done: true,
        tests: action.payload,
      };
    case bankActions.GET_ALL_TEST_ERROR:
      return {
        ...state,
        action: bankActions.GET_ALL_TEST_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.GET_BANK_QUESTIONS:
      return {
        ...state,
        action: bankActions.GET_BANK_QUESTIONS,
        done: false,
        limitItemsQuestion: action.payload.limitItems,
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
    case bankActions.ADD_QUESTION:
      return {
        ...state,
        action: bankActions.ADD_QUESTION,
        done: false,
      };
    case bankActions.ADD_QUESTION_SUCCESS: {
      let newQuestions = [...state.questions];
      const limitItems = state.limitItemsQuestion;

      if (newQuestions.length < limitItems) {
        newQuestions = [...state.questions, action.payload];
      } else newQuestions = [...state.questions];
      let newSelected = {
        ...state.selected,
        idQuestions: [...state.selected.idQuestions, action.payload._id],
      };
      let newBanks = [...state.banks];
      for (let i = 0; i < state.banks.length; i++) {
        if (state.banks[i]._id === state.selected._id) {
          newBanks = [
            ...newBanks.slice(0, i),
            newSelected,
            ...newBanks.slice(i + 1),
          ];
        }
      }
      return {
        ...state,
        action: bankActions.ADD_QUESTION_SUCCESS,
        done: true,
        questions: newQuestions,
        selected: newSelected,
        banks: newBanks,
      };
    }
    case bankActions.ADD_QUESTION_ERROR:
      return {
        ...state,
        action: bankActions.ADD_QUESTION_ERROR,
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
          newQuestions = state.questions.filter(
            (question) => question._id != action.payload._id
          );
        } else {
          const index = state.questions.findIndex(
            (h) => h._id === action.payload._id
          );
          console.log(index);
          newQuestions = [...state.questions];
          newQuestions[index] = action.payload;
          console.log(newQuestions, action.payload);
        }
      } else newQuestions = state.questions;

      // console.log(newQuestions)
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
    case bankActions.GET_RESULTS_BY_USER: {
      return {
        ...state,
        action: bankActions.GET_RESULTS_BY_USER,
        done: false,
      };
    }
    case bankActions.GET_RESULTS_BY_USER_SUCCESS: {
      return {
        ...state,
        action: bankActions.GET_RESULTS_BY_USER_SUCCESS,
        done: true,
        results: action.payload,
      };
    }
    case bankActions.GET_RESULTS_BY_USER_ERROR: {
      return {
        ...state,
        action: bankActions.GET_RESULTS_BY_USER_ERROR,
        done: true,
        error: action.payload,
      };
    }
    case bankActions.GET_TEST_BY_ID: {
      return {
        ...state,
        action: bankActions.GET_TEST_BY_ID,
        done: false,
      };
    }
    case bankActions.GET_TEST_BY_ID_SUCCESS: {
      return {
        ...state,
        action: bankActions.GET_TEST_BY_ID_SUCCESS,
        done: true,
        test: action.payload,
      };
    }
    case bankActions.GET_TEST_BY_ID_ERROR: {
      return {
        ...state,
        action: bankActions.GET_TEST_BY_ID_ERROR,
        done: true,
        error: action.payload,
      };
    }
    case bankActions.CREATE_BANK: {
      return {
        ...state,
        action: bankActions.CREATE_BANK,
        done: false,
      };
    }
    case bankActions.CREATE_BANK_SUCCESS: {
      console.log(action);
      let newBanks: any = [];
      if (state.banks.length < state.limitItemsBank) {
        newBanks = [...state.banks, action.payload];
      } else newBanks = [...state.banks];
      return {
        ...state,
        action: bankActions.CREATE_BANK_SUCCESS,
        done: true,
        banks: newBanks,
      };
    }
    case bankActions.CREATE_BANK_ERROR: {
      return {
        ...state,
        action: bankActions.CREATE_BANK_ERROR,
        done: true,
        error: action.payload,
      };
    }
    case bankActions.DELETE_BANK_BY_ID: {
      return {
        ...state,
        action: bankActions.DELETE_BANK_BY_ID,
        done: false,
      };
    }
    case bankActions.DELETE_BANK_BY_ID_SUCCESS: {
      let newBanks = [...state.banks];
      newBanks = newBanks.filter((bank) => bank._id != action.payload);

      return {
        ...state,
        action: bankActions.DELETE_BANK_BY_ID_SUCCESS,
        done: true,
        banks: newBanks,
      };
    }
    case bankActions.DELETE_BANK_BY_ID_ERROR: {
      return {
        ...state,
        action: bankActions.DELETE_BANK_BY_ID_ERROR,
        done: true,
      };
    }
    case bankActions.CREATE_TEST: {
      return {
        ...state,
        action: bankActions.CREATE_TEST,
        done: false,
      };
    }
    case bankActions.CREATE_TEST_SUCCESS: {
      console.log(state);
      // console.log(action.payload);
      // let newTests = [...state.tests, action.payload];
      let newTests = [...state.selected.idTests, action.payload];
      let newBanks = [...state.banks];

      let newSelected = { ...state.selected, idTests: newTests };

      for (let bank of newBanks) {
        if (bank._id === action.payload.source) {
          // console.log(bank)
          let newBank = {
            ...bank,
            idTests: newTests,
          };
          const index = newBanks.indexOf(bank);
          console.log(index);
          newBanks = [
            ...newBanks.slice(0, index),
            newBank,
            ...newBanks.slice(index + 1),
          ];
        }
      }
      console.log(newBanks);
      return {
        ...state,
        action: bankActions.CREATE_TEST_SUCCESS,
        done: true,
        tests: newTests,
        banks: newBanks,
        selected: newSelected,
      };
    }
    case bankActions.CREATE_TEST_ERROR:
      return {
        ...state,
        action: bankActions.CREATE_TEST_ERROR,
        done: true,
        error: action.payload,
      };
    case bankActions.UPDATE_BANK_BY_ID:
      return {
        ...state,
        action: bankActions.UPDATE_BANK_BY_ID,
        done: false,
      };
    case bankActions.UPDATE_BANK_BY_ID_SUCCESS: {
      console.log(action.payload)
      let selectedBank: any;

      for (let bank of state.banks) {
        if (bank._id === action.payload[0]._id) {
          selectedBank = bank;
        }
      }
      const index = state.banks.indexOf(selectedBank) 
      let newBanks = [...state.banks.slice(0, index), action.payload[0], ...state.banks.slice(index + 1)]

      return {
        ...state,
        action: bankActions.UPDATE_BANK_BY_ID_SUCCESS,
        done: true,
        banks: newBanks
      };
    }
    case bankActions.UPDATE_BANK_BY_ID_ERROR: {
      return {
        ...state,
        action: bankActions.UPDATE_BANK_BY_ID_ERROR,
        done: true,
      }
    }

    default:
      return;
  }
}

export const getBankState = createFeatureSelector<BankArrayState>('stores');

export const getAllBanks = createSelector(
  getBankState,
  (state: BankArrayState) => {
    console.log(state);
    if (state) {
      if (state.banks) return state.banks;
    }

    return [];
  }
);
export const getOneBank = createSelector(
  getBankState,
  (state: BankArrayState) => {
    if (state) return state.selected;

    return null;
  }
);
export const getAllTest = createSelector(
  getBankState,
  (state: BankArrayState) => {
    if (state) return state.tests;

    return [];
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
    return state.question;
  }
);
export const getResultsUser = createSelector(
  getBankState,
  (state: BankArrayState) => {
    if (state) return state.results;
    return [];
  }
);
export const getTest = createSelector(getBankState, (state: BankArrayState) => {
  return state.test;
});
