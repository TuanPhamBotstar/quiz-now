export interface Test {
    _id: string;
    questions: [];
    code: string;
    link: string;
    title: string;
    time: number;
    knowTheResult: boolean;
    numberOfEasyQuestions: number;
    numberOfNormalQuestions: number;
    numberOfHardQuestions: number;
    source: string;
    requireInfo: [];
}