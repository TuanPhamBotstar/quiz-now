export interface Result {
    _id: string;
    idTest: string;
    idUser: string;
    numberOfEasyQuestions: number;
    numberOfNormalQuestions: number;
    numberOfHardQuestions: number;
    userAnswers: [];
    count: number;
    score: number;
    infos: [];
  }