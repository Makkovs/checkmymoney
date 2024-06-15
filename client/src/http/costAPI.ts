import { CostTypes } from "../types/cost";
import { $authHost, $host } from "./index";

interface CostData {
    id: number;
    value: number;
    type?: CostTypes | null;
    categoryId?: number | null;
    costGroupId: number;
    userId?: number | null;
    betweenDate?: string | null;
}

export const createCost = async <T extends CostData>(
    value: T["value"], categoryId: T["categoryId"], type: T["type"], costGroupId: T["costGroupId"]
) => {
    try {
        const { data } = await $authHost.post("api/cost/create", { value, categoryId, type, costGroupId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchAllCosts = async <T extends CostData>(
    categoryId: T["categoryId"], type: T["type"], costGroupId: T["costGroupId"], userId: T["userId"], beetweenDate: T["betweenDate"]
) => {
    try {
        const { data } = await $host.get("api/cost/get-all", {
            params: { categoryId, type, costGroupId, userId, beetweenDate }
        });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchOneCost = async <T extends CostData>(id: T["id"]) => {
    try {
        const { data } = await $host.get("api/cost/get-all", { params: { id } });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const deleteCost = async <T extends CostData>(id: T["id"]) => {
    try {
        const { data } = await $authHost.delete("api/cost/delete", { data: { id } });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}