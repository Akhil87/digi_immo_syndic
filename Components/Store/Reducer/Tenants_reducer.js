import { TENANTS_ALL, TENANTS_DETAILS } from "../Actions/Action_types";

const initialState = {
  all_tenants: null,
  selected_tenants_details: null
};

export const Tenants_reducer = (state = initialState, action) => {
  switch (action.type) {
    case TENANTS_ALL:
      return { ...state, all_tenants: action.payload };
    case TENANTS_DETAILS:
      return { ...state, selected_tenants_details: action.payload };

    default:
      return state;
  }
};
