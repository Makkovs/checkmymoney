export interface IGroup{
    id: number;
    name: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    ownerName?: string;
    cost?: number
}