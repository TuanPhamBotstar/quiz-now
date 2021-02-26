import { AppAction } from '../app.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as bankActions from '../bank/bank.actions';
import { Question } from '../../bank/models/question';
import { Result } from '../../bank/models/result';
import { Test } from '../../bank/models/test';

export interface ResultArrayState {
  name: string | any;
}
const initialArrayState: ResultArrayState = {
  name: '',
};
export function resultReducer(
  state = initialArrayState,
  action: AppAction
) {
    switch(action.type) {
        default:
            return;
    }
}
export const getResultsState = createFeatureSelector<ResultArrayState>(
  'results'
);
export const getAllResults = createSelector(
    getResultsState,
    (state: ResultArrayState) => {
        return null
    }
)
