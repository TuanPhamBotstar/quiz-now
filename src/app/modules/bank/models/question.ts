import {Answer} from './answer';

export interface Question {
    _id: string,
    title: string,
    answers: Answer[],
    level: String,
    isManyAnswers: Boolean,
    bank: string
}