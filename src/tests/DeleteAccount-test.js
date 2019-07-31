import React from "react";
import expect, { createSpy, spyOn, isSpy } from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import fetchMock from "fetch-mock";
import { addLocaleData, IntlProvider } from "react-intl";
import DeleteModal from "components/DeleteModal";
import DeleteAccount from "components/DeleteAccount";
import * as actions from "actions/Security";
import securityReducer from "reducers/Security";
const mock = require("jest-mock");
const messages = require("../../i18n/l10n/en");
addLocaleData("react-intl/locale-data/en");

// I am the component that: displays the "Delete account" button (in settings) that triggers the logout modal.
// My job is to: I render a button > that triggers a modal (the modal has to render two buttons, each with their own functionality).

describe("Delete Account component", () => {
  it("Does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <DeleteAccount />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("DeleteAccount component", () => {
  // beforeAll(() => {
  //   window.beforeunload = () => "";
  // });
  // beforeEach(() => {
  //   window.beforeunload = () => "";
  // });
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    security: {
      credentials: [],
      confirming_deletion: false,
      deleted: false,
      redirect_to: ""
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccount />
      </Provider>
    );
    return {
      wrapper
    };
  }

  const state = { ...fakeState };
  it("has a button", () => {
    const { wrapper } = setupComponent();
    console.log(wrapper.debug());
    const button = wrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
  it("has a (hidden) modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(DeleteModal);
    expect(modal.exists()).toEqual(true);
  });
});

describe("DeleteAccount component, when confirming_deletion is (false)", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    security: {
      credentials: [],
      confirming_deletion: false,
      deleted: false,
      redirect_to: ""
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccount />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  // leave confirming_change as false
  it("does not render a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(DeleteModal);
    expect(modal.props().showModal).toEqual(false);
  });

  it("Renders only one 'Delete Account' EduIDButton", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton");
    expect(button.length).toEqual(1);
  });
});

describe("DeleteAccount component, when confirming_deletion is (true)", () => {
  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  const fakeState = {
    security: {
      confirming_deletion: false
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccount />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  // set confirming_change to true
  state.security.confirming_deletion = true;
  it("renders a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(DeleteModal);
    expect(modal.props().showModal).toEqual(true);
  });
  it("Renders DELETE ACCOUNT and CANCEL EduIDButtons in modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(DeleteModal);
    const button = modal.find("EduIDButton");
    expect(button.length).toEqual(2);
  });
});

// describe("ChangePasswordDisplay Container ", () => {
//   let mockProps, wrapper, button, dispatch;

//   const fakeStore = state => ({
//     default: () => {},
//     dispatch: mock.fn(),
//     subscribe: mock.fn(),
//     getState: () => ({ ...state })
//   });

//   const fakeState = {
//     security: {
//       confirming_change: false
//     },
//     intl: {
//       locale: "en",
//       messages: messages
//     }
//   };

//   function setupComponent() {
//     mockProps = {};

//     const wrapper = mount(
//       <Provider store={fakeStore(fakeState)}>
//         <ChangePasswordDisplay {...mockProps} />
//       </Provider>
//     );
//     return {
//       mockProps,
//       wrapper
//     };
//   }

//   it("Renders", () => {
//     // expect(button.length).toEqual(1);
//   });

//   it("Clicks", () => {
//     const state = { ...fakeState };
//     const { wrapper } = setupComponent();
//     // console.log(wrapper.debug());
//     const button = wrapper.find("EduIDButton");
//     // expect(button.exists()).toEqual(true);
//     // expect(state.security.confirming_change).toEqual(false);
//     // button.simulate("click");
//     // wrapper.update();
//     // console.log(wrapper.debug());
//     // expect(state.security.confirming_change).toEqual(true);
//   });
// });

describe("DeleteAccount redux functionality", () => {
  it("DeleteAccount button triggers handleStartConfirmationDeletion()", () => {
    // TEST: prove that this EduIDButton triggers handleStartConfirmationPassword() > dispatches startConfirmationPassword()
    // const expectedAction = {
    //   type: actions.START_CHANGE_PASSWORD
    // };
    // expect(actions.startConfirmationPassword()).toEqual(expectedAction);
  });

  it("startConfirmationDeletion() should trigger the action START_DELETE_ACCOUNT", () => {
    const expectedAction = {
      type: actions.START_DELETE_ACCOUNT
    };
    expect(actions.startConfirmationDeletion()).toEqual(expectedAction);
  });

  it("START_DELETE_ACCOUNT retuns confirming_deletion: true", () => {
    const mockState = {
      confirming_deletion: false
    };
    expect(
      securityReducer(mockState, {
        type: actions.START_DELETE_ACCOUNT
      })
    ).toEqual({
      confirming_deletion: true
    });
  });
});

// ----- MODAL STUFF ----- //
describe("Logout modal redux functionality", () => {
  it("Modal ACCEPT button triggers handleConfirmationPassword()", () => {
    //     // TEST: 3. Can we prove that the ACCEPT button triggers handleConfirmationPassword() > dispatches confirmDeletion()
  });
  it("Modal ACCEPT button should trigger the POST_DELETE_ACCOUNT action ", () => {
    const expectedAction = {
      type: actions.POST_DELETE_ACCOUNT
    };
    expect(actions.confirmDeletion()).toEqual(expectedAction);
  });
  it("POST_DELETE_ACCOUNT action retuns the current state", () => {
    const mockState = {
      confirming_change: false
    };
    expect(
      securityReducer(mockState, {
        type: actions.GET_CHANGE_PASSWORD
      })
    ).toEqual({
      confirming_change: false
    });
  });

  it("Modal CANCEL button triggers handleStopConfirmationDeletion()", () => {
    //     // TEST: can we prove that the CANCEL button triggers handleStopConfirmationDeletion() > dispatches stopConfirmationDeletion()
  });
  it("Modal CANCEL button should trigger the STOP_DELETE_ACCOUNT action ", () => {
    const expectedAction = {
      type: actions.STOP_DELETE_ACCOUNT
    };
    expect(actions.stopConfirmationDeletion()).toEqual(expectedAction);
  });
  it("STOP_DELETE_ACCOUNT action retuns confirming_deletion: false", () => {
    const mockState = {
      confirming_deletion: false
    };
    expect(
      securityReducer(mockState, {
        type: actions.STOP_DELETE_ACCOUNT
      })
    ).toEqual({
      confirming_deletion: false
    });
  });
});
