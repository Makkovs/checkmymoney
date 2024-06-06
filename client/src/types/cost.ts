interface ICost {
    id: number;
    category: string;
    type: "SPENDING" | "INCOMING";
    cost: number;
    createdAt: string;
    updatedAt: string;
};