export type Result = {
    id: string;
    results: OptionResult[];
}

export type OptionResult = {
    qno: number;
    isCorrect: boolean | null;
    selectedOptionId: number | null;
    answerId: number | null;
};