import { SetAuthAction, SetUserAction, UserState, UserActionTypes, IUser } from "../types/userTypes";

const defaultState: UserState = {
    isAuth: false,
}

type UserAction = SetUserAction | SetAuthAction;

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case UserActionTypes.SET_AUTH:
            return { ...state, isAuth: action.payload };
        default:
            return state;
    }
}

export const setUserAction = (payload: IUser): SetUserAction => ({ type: UserActionTypes.SET_USER, payload });
export const setAuthAction = (payload: boolean): SetAuthAction => ({ type: UserActionTypes.SET_AUTH, payload });