import { Action, createAction, props } from '@ngrx/store';
import {Bank} from '../bank/services/bank.service';

export const GET_BANKS = '[BANKS] Banks';
export const GET_BANKS_SUCCESS = '[BANKS] Banks Success';
export const GET_BANKS_ERROR = '[BANKS] Banks Error';

export const GET_BANK_BY_ID = '[BANK] Bank';
export const GET_BANK_BY_ID_SUCCESS = '[BANK] Bank Success';
export const GET_BANK_BY_ID_ERROR = '[BANK] Bank Error';

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