import expect from "expect";
import * as actions from "actions/Eidas";
import eidasReducer from "reducers/Eidas";
import { addLocaleData } from "react-intl";

addLocaleData("react-intl/locale-data/en");

describe("Eidas Actions", () => {
  it("should create an action to trigger modal window", () => {
    const expectedAction = {
      type: actions.SHOW_EIDAS_MODAL
    };
    expect(actions.showEidasModal()).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    eidas_sp_freja_idp_url: "",
    showModal: false
  };

  it("Receives a SHOW_EIDAS_MODAL action", () => {
    expect(
      eidasReducer(mockState, {
        type: actions.SHOW_EIDAS_MODAL
      })
    ).toEqual({
      eidas_sp_freja_idp_url: "",
      showModal: true
    });
  });

  it("Receives a DUMMY action", () => {
    expect(
      eidasReducer(mockState, {
        type: "DUMMY_ACTION",
        payload: "dummy payload"
      })
    ).toEqual({
      eidas_sp_freja_idp_url: "",
      showModal: false
    });
  });
});
