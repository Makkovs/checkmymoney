import { $authHost, $host } from "./index";

interface CostGroupData {
    id: number;
    name: string;
    memberId: number;
}

export const createGroup = async <T extends CostGroupData>(name: T["name"]) => {
    try {
        const { data } = await $authHost.post("api/cost-group/create", { name });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchAllGroups = async () => {
    try {
        const { data } = await $authHost.get("api/cost-group/get-all");
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const fetchOneGroup = async <T extends CostGroupData>(id: T["id"]) => {
    try {
        const { data } = await $host.get("api/cost-group/get-one", { params: id });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const addMemberToGroup = async <T extends CostGroupData>(id: T["id"], memberId: T["memberId"]) => {
    try {
        const { data } = await $authHost.put("api/cost-group/add-member", { id, memberId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const removeMemberFromGroup = async <T extends CostGroupData>(id: T["id"], memberId: T["memberId"]) => {
    try {
        const { data } = await $authHost.patch("api/cost-group/remove-member", { id, memberId });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const renameGroup = async <T extends CostGroupData>(id: T["id"], name: T["name"]) => {
    try {
        const { data } = await $authHost.patch("api/cost-group/rename", { id, name });
        return data;
    } catch (error: any){
        return error.response.data.error;
    }
}

export const deleteGroup = async <T extends CostGroupData> (id: T["id"]) => {
    try {
        const { data } = await $authHost.delete("api/cost-group/delete", { data: id });
        return data;
    } catch (error: any) {
        return error.response.data.error;
    }
}