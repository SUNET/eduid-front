import * as actions from "actions/PendingActions";

const modalData = {
  showModal: false
};

let pendingActionsReducer = (state = modalData, action) => {
  switch (action.type) {
    case actions.SHOW_MODAL:
      return {
        ...state,
        showModal: true
      };
    case actions.CLOSE_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default pendingActionsReducer;
