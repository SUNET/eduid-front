export const ADD_NAVID_TO_STORE = "ADD_NAVID_TO_STORE";

export const addNavId = (navId) => ({
  type: ADD_NAVID_TO_STORE,
  payload: {
    navId: navId,
  },
});
