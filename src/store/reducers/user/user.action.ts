import User from "../../../types/user.types";
import UserActionsTypes from "./user.action.types";

export const loginUser = (payload: User) => ({
  type: UserActionsTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({ type: UserActionsTypes.LOGOUT });
