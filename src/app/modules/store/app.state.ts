import {Bank} from '../bank/services/bank.service';

export interface AppState {
    banks: ReadonlyArray<Bank>,
}