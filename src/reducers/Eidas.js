import * as actions from "actions/Eidas";

const eidasData = {
  eidas_sp_freja_idp_url: "",
  showModal: false
};

let eidasReducer = (state = eidasData, action) => {
  switch (action.type) {
    case actions.SHOW_EIDAS_MODAL:
      return {
        ...state,
        showModal: true
      };
    case actions.HIDE_EIDAS_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default eidasReducer;
