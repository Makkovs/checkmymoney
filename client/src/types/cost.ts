import { ICategory } from "./category";

export interface ICost {
    id: number;
    categoryId: number;
    category?: ICategory;
    type: "SPENDING" | "INCOMING";
    value: number;
    createdAt: string;
    updatedAt: string;
};

export enum CostTypes {
    SPENDING = "SPENDING",
    INCOMING = "INCOMING"
}

export enum TimePeriods {
    ALLTIME = "ALL-TIME",
    YEAR = "YEAR",
    MONTH = "MONTH"
}