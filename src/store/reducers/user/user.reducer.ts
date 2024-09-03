import User from "../../../types/user.types";
import { UserActions } from "./user.action";
import UserActionsTypes from "./user.action.types";

interface InitialState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (
  state = initialState,
  action: UserActions,
): InitialState => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case UserActionsTypes.LOGOUT:
      return { ...state, currentUser: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default userReducer;
