import { Bank } from '../bank/services/bank.service';
import { AppAction } from './app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as bankActions from './bank.actions';

export interface BankArrayState {
  banks: Bank[];
  selected: Bank | any;
  action: string | any;
  done: boolean;
  error?: Error | any;
}
const initialArrayState: BankArrayState = {
  banks: [],
  selected: null,
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
    default:
      return;
  }
}

export const getBankState = createFeatureSelector<BankArrayState>('banks');
export const getAllBanks = createSelector(
  getBankState,
  (state: BankArrayState) => {
    return state.banks;
  }
);
export const getOneBank = createSelector(
    getBankState,
    (state: BankArrayState) => {
        console.log(state.selected);
        return state.selected;
    }
)