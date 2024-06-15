import { $authHost } from ".";

interface CategoryData {
    id: number
    name: string;
    imgId: string;
    costGroupId: number;
}

export const createCategory = async <T extends CategoryData>(
    name: T["name"], imgId: T["imgId"], costGroupId: T["costGroupId"]
) => {
    try {
        const { data } = await $authHost.post("api/category/create", { name, imgId, costGroupId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchCategories = async <T extends CategoryData>(
    costGroupId: T["costGroupId"]
) => {
    try {
        const { data } = await $authHost.get("api/category/get-all", { params: { costGroupId } });
        return data;
    } catch (error: any) {
        return error.response.data.error
    }
}

export const fetchOneCategory = async <T extends CategoryData>(id: T["id"]) => {
    try {
        const { data } = await $authHost.get("api/category/get-one", { params: { id } });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const renameCategory = async <T extends CategoryData>(
    id: T["id"], name: T["name"]
) => {
    try {
        const { data } = await $authHost.patch("api/category/rename", { id, name })
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const changeCategoryIcon = async <T extends CategoryData>(
    id: T["id"], imgId: T["imgId"]
) => {
    try {
        const { data } = await $authHost.patch("api/category/change-icon", { id, imgId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const deleteCategory = async <T extends CategoryData>(id: T["id"]) => {
    try {
        const { data } = await $authHost.delete("api/category/delete", { data: { id } });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}