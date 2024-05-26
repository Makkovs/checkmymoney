import { UnknownAction } from "redux";

export interface IUser {
    id: number;
    name: string;
}

export interface UserState {
    isAuth: boolean;
    user?: IUser;
}

export enum UserActionTypes {
    SET_USER = "SET_USER",
    SET_AUTH = "SET_AUTH"
}

export interface SetUserAction extends UnknownAction {
    type: UserActionTypes.SET_USER;
    payload: IUser;
}

export interface SetAuthAction extends UnknownAction {
    type: UserActionTypes.SET_AUTH;
    payload: boolean;
}