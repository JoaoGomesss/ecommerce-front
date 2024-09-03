import User from "../../../types/user.types";
import UserActionsTypes from "./user.action.types";

interface LoginUserAction {
  type: typeof UserActionsTypes.LOGIN;
  payload: User;
}

export const loginUser = (payload: User): LoginUserAction => ({
  type: UserActionsTypes.LOGIN,
  payload,
});

interface LogoutUserAction {
  type: typeof UserActionsTypes.LOGOUT;
}

export const logoutUser = (): LogoutUserAction => ({
  type: UserActionsTypes.LOGOUT,
});

export type UserActions = LoginUserAction | LogoutUserAction;
