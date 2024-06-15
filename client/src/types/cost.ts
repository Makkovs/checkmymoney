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