import { $authHost, $host } from "./index";

interface CostData {
    id: number;
    cost: number;
    type?: string | null;
    category?: string | null;
    costGroupId: number;
    userId?: number | null;
    betweenDate?: string | null;
}

export const createCost = async <T extends CostData>(
    cost: T["cost"], category: T["category"], type: T["type"], costGroupId: T["costGroupId"]
) => {
    try {
        const { data } = await $authHost.post("api/cost/create", { cost, category, type, costGroupId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchAllCosts = async <T extends CostData>(
    category: T["category"], type: T["type"], costGroupId: T["costGroupId"], userId: T["userId"], beetweenDate: T["betweenDate"]
) => {
    try {
        const { data } = await $host.get("api/cost/get-all", {
            params: { category, type, costGroupId, userId, beetweenDate }
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