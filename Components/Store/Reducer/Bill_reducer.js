import {
  BILL_DATA,
  PROVISION_BILL_DATA,
  PROVISION_BILL_TOTAL,
  REVERSE_FUND_BILL_DATA,
  REVERSE_FUND_BILL_TOTAL
} from "../Actions/Action_types";

const initialState = {
  bill: null,
  provision_bill: null,
  total_provision_bill: 0,
  reserve_fund: null,
  total_reserve_fund: 0
};

export const Bill_reducer = (state = initialState, action) => {
  switch (action?.type) {
    case BILL_DATA:
      return { ...state, bill: action?.bill };

    case PROVISION_BILL_DATA:
      return { ...state, provision_bill: action?.provision_bill };

    case PROVISION_BILL_TOTAL:
      return {
        ...state,
        total_provision_bill: action?.total_provision_bill
      };

    case REVERSE_FUND_BILL_DATA:
      return {
        ...state,
        reserve_fund: action?.reserve_fund
      };
    case REVERSE_FUND_BILL_TOTAL:
      return {
        ...state,
        total_reserve_fund: action?.total_reserve_fund
      };

    default:
      return state;
  }
};
