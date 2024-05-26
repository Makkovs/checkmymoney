import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from "./index";
import { IUser } from "../types/userTypes";

interface UserData {
    id: number;
    name: string;
    login: string;
    password: string;
}

export const createUser = async <T extends UserData>(name: T["name"], login: T["login"], password: T["password"]) => {
    try {
        const { data } = await $host.post("api/user/create", { name, login, password });
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token);
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const loginUser = async <T extends UserData>(login: T["login"], password: T["password"]) => {
    try {
        const { data } = await $host.post("api/user/login", { login, password });
        localStorage.setItem("token", data.token);
        return jwtDecode(data.token);
    } catch (error: any) {
        return error.response.data.error;
    }
}

export const check = async () => {
    try {
        const { data } = await $authHost.post("api/user/auth");
        localStorage.setItem("token", data.token);
        const decoded:IUser = jwtDecode(data.token);
        return decoded;
    } catch (error: any){
        if (error.response.status !== 401){
            return error.response.data.error;
        }
    }  
}

export const fetchOneUser = async <T extends UserData>(id: T["id"]) => {
    const { data } = await $host.get("api/user/get-one", { params: { id } });
    return data;
}