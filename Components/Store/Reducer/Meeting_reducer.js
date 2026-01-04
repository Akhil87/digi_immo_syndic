import {
  GET__POLLS_RESULT,
  GET_ALL_POLLS,
  MEETINGS,
  SINGLE_MEETINGS
} from "../Actions/Action_types";

const initialState = {
  all_meetings: null,
  selected_meeting_details: null,
  get_All_Polls: null,
  poll_result_data: null
};

export const Meeting_reducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETINGS:
      return { ...state, all_meetings: action.payload };
    case SINGLE_MEETINGS:
      return { ...state, selected_meeting_details: action.payload };
    case GET_ALL_POLLS:
      return { ...state, get_All_Polls: action.payload };
    case GET__POLLS_RESULT:
      return { ...state, poll_result_data: action.payload };
    default:
      return state;
  }
};
