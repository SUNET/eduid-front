import * as actions from "actions/Profile";

const profile = {
  max: 0,
  cur: 0,
  pending: [],
  pending_confirm: []
};

let profileReducer = (state = profile, action) => {
  switch (action.type) {
    case actions.PROFILE_FILLED:
      return {
        ...state,
        max: action.payload.max,
        cur: action.payload.cur,
        pending: action.payload.pending,
        pending_confirm: action.payload.pending_confirm
      };
    default:
      return state;
  }
};
export default profileReducer;
