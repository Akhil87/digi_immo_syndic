import { LOADER_VISIABLE } from "../Actions/Action_types";

const initialState = {
  visiable: false
};

export const Loader_reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_VISIABLE:
      return { ...state, visiable: action.payload };

    default:
      return state;
  }
};
