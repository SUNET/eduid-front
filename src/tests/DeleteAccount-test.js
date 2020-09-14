import React from "react";
import expect, { createSpy, spyOn, isSpy } from "expect";
import { Provider } from "react-intl-redux";
import { shallow, mount } from "enzyme";
import { put, select, call } from "redux-saga/effects";
import fetchMock from "fetch-mock";
import { addLocaleData, IntlProvider } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";
import DeleteAccountContainer from "containers/DeleteAccount";
import DeleteAccount from "components/DeleteAccount";
import * as actions from "actions/Security";
import * as notifyActions from "actions/Notifications";
import securityReducer from "reducers/Security";
import {
  requestDeleteAccount,
  postDeleteAccount,
  deleteAccount
} from "sagas/Security";
const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

// I am the component that: allows users to delete their account in settings.
// My job is to: I render a "Delete account" button > that triggers a modal (the modal has to render two buttons, each with their own functionality).

// Comment N:
// - WARNING! APP CURRENTLY BROKEN: window.href.location redirect has been commented out in app to make tests run
// - how was this handled before? the redirect in this component causes issues for testing (currently commented out). Does this component not act the same as ChangePasswordDisplay? If not, how are they different? Can they be built the same?
// click button > triggers modal > ACCEPT triggers redirect to login.
// What happens when state.security.delete = true and how to test it?
// test of modal at bottom (are they ok here or should they be in a separate modal file)

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
      redirect_to: "",
      location: "dummy-location"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccountContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }

  const state = { ...fakeState };
  state.security.location = "";
  it("has a button", () => {
    const { wrapper } = setupComponent();
    const button = wrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
  it("has a (hidden) modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotoficationModal);
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
      redirect_to: "",
      location: "dummy-location"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccountContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  // leave confirming_change as false
  state.security.location = "";
  it("does not render a modal", () => {
    const { wrapper } = setupComponent();
    // console.log(wrapper.debug());
    const modal = wrapper.find(NotificationModal);
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
      confirming_deletion: false,
      location: "dummy-location"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <DeleteAccountContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }
  const state = { ...fakeState };
  // set confirming_change to true
  state.security.location = "";
  state.security.confirming_deletion = true;
  it("renders a modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    expect(modal.props().showModal).toEqual(true);
  });
  it("Renders DELETE ACCOUNT and CANCEL EduIDButtons in modal", () => {
    const { wrapper } = setupComponent();
    const modal = wrapper.find(NotificationModal);
    const primaryButton = modal.find("EduIDButton");
    // const modalButton = modal.find("ButtonModal");
    expect(primaryButton.length).toEqual(2);
    // expect(modalButton.length).toEqual(1);
  });
});

// failed attempt at tests
// describe("DeleteAccount Container ", () => {
//   let mockProps, wrapper, button, dispatch;

//   const fakeStore = state => ({
//     default: () => {},
//     dispatch: mock.fn(),
//     subscribe: mock.fn(),
//     getState: () => ({ ...state })
//   });

//   const fakeState = {
//     security: {
//       confirming_deletion: false
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
//         <DeleteAccountContainer {...mockProps} />
//       </Provider>
//     );
//     return {
//       mockProps,
//       wrapper
//     };
//   }

//   it("Renders", () => {
//     const { wrapper } = setupComponent();
//     const button = wrapper.find("EduIDButton");
//     expect(button.length).toEqual(1);
//   });

//   it("Clicks", () => {
//     const state = { ...fakeState };
//     const { wrapper } = setupComponent();
//     // console.log(wrapper.debug());
//     const button = wrapper.find("EduIDButton");
//     expect(button.exists()).toEqual(true);
//     expect(state.security.confirming_deletion).toEqual(false);
//     button.simulate("click");
//     wrapper.update();
//     // console.log(wrapper.debug());
//     // expect(state.security.confirming_deletion).toEqual(true);
//   });
// });

describe("DeleteAccount redux functionality", () => {
  it("DeleteAccount button triggers handleStartConfirmationDeletion()", () => {
    // TEST: can we prove that this EduIDButton triggers handleStartConfirmationPassword() > dispatches startConfirmationPassword()
    // maybe this is what happens at the bottom of the file in the test stolen from the old files?
    // expect(dispatch.mock.calls[0][0].type).toEqual(actions.POST_DELETE_ACCOUNT)
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
    // TEST: Can we prove that the ACCEPT button triggers handleConfirmationPassword() > dispatches confirmDeletion()
  });
  it("Modal ACCEPT button should trigger the POST_DELETE_ACCOUNT action ", () => {
    const expectedAction = {
      type: actions.POST_DELETE_ACCOUNT
    };
    expect(actions.confirmDeletion()).toEqual(expectedAction);
  });
  it("POST_DELETE_ACCOUNT action retuns the current state", () => {
    const mockState = {
      confirming_deletion: false
    };
    expect(
      securityReducer(mockState, {
        type: actions.POST_DELETE_ACCOUNT
      })
    ).toEqual({
      confirming_deletion: false
    });
  });

  it("POST_DELETE_ACCOUNT_SUCCESS action returns the updated state", () => {
    const mockState = {
      message: "",
      confirming_deletion: false,
      location: ""
    };
    const location = "dummy-location";
    expect(
      securityReducer(mockState, {
        type: actions.POST_DELETE_ACCOUNT_SUCCESS,
        payload: {
          location: location
        }
      })
    ).toEqual({
      message: "",
      location: "dummy-location",
      confirming_deletion: false
    });
  });

  it("POST_DELETE_ACCOUNT_FAIL action returns an error state", () => {
    const mockState = {
      confirming_deletion: false
    };
    const err = "Error";
    expect(
      securityReducer(mockState, {
        type: actions.POST_DELETE_ACCOUNT_FAIL,
        error: true,
        payload: {
          message: err
        }
      })
    ).toEqual({
      message: err,
      confirming_deletion: false
    });
  });

  it("Modal CANCEL button triggers handleStopConfirmationDeletion()", () => {
    // TEST: can we prove that the CANCEL button triggers handleStopConfirmationDeletion() > dispatches stopConfirmationDeletion()
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

// ----- TAKEN FROM OLD FILES: SECURTIY TESTS ----- //
// container and saga test

describe("DeleteAccount Container", () => {
  let mockProps, language, getWrapper, getState, dispatch, store;

  const fakeStore = state => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state })
  });

  beforeEach(() => {
    getState = function(deleting, askingDescription) {
      return {
        security: {
          message: "",
          code: "",
          confirming_deletion: deleting,
          location: "",
          deleted: false
        },
        config: {
          csrf_token: "",
          DASHBOARD_URL: "/dummy-dash-url/",
          TOKEN_SERVICE_URL: "/dummy-tok-url/"
        },
        intl: {
          locale: "en",
          messages: messages
        },
        notifications: {
          messages: [],
          errors: []
        }
      };
    };

    mockProps = {
      credentials: [],
      language: "en",
      confirming_deletion: false
    };

    getWrapper = function({
      deleting = false,
      askingDesc = false,
      props = mockProps
    } = {}) {
      store = fakeStore(getState(deleting, askingDesc));
      dispatch = store.dispatch;

      const wrapper = mount(
        <Provider store={store}>
          <DeleteAccountContainer {...props} />
        </Provider>
      );
      return wrapper;
    };
    language = getWrapper()
      .find(DeleteAccountContainer)
      .props().language;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Renders test", () => {
    expect(language).toEqual("en");
  });

  it("Clicks delete", () => {
    expect(dispatch.mock.calls.length).toEqual(0);
    getWrapper()
      .find("EduIDButton#delete-button")
      .props()
      .onClick();
    expect(dispatch.mock.calls.length).toEqual(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(
      notifyActions.RM_ALL_NOTIFICATION
    );
    expect(dispatch.mock.calls[1][0].type).toEqual(
      actions.START_DELETE_ACCOUNT
    );
  });

  it("Clicks confirm delete", () => {
    fetchMock.post("/dummy-sec-url", {
      type: actions.POST_DELETE_ACCOUNT
    });

    const newProps = {
      credentials: [],
      language: "en",
      confirming_deletion: true
    };
    const deleteModal = getWrapper(true, false, newProps).find("DeleteModal");
    expect(dispatch.mock.calls.length).toEqual(0);
    deleteModal.props().handleConfirm();
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(dispatch.mock.calls[0][0].type).toEqual(actions.POST_DELETE_ACCOUNT);
  });
});

describe("Async component", () => {
  const mockState = {
    security: {
      location: ""
    },
    config: {
      csrf_token: "csrf-token",
      DASHBOARD_URL: "/dummy-dash-url/",
      TOKEN_SERVICE_URL: "/dummy-tok-url/",
      SECURITY_URL: "/dummy-sec-url"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  };

  it("Sagas request DeleteAccount", () => {
    const generator = postDeleteAccount();
    let next = generator.next();
    expect(next.value).toEqual(put(actions.postConfirmDeletion()));

    next = generator.next();
    expect(next.value.SELECT.args).toEqual([]);

    const data = {
      csrf_token: "csrf-token"
    };

    next = generator.next(mockState);
    expect(next.value).toEqual(call(deleteAccount, mockState.config, data));

    const action = {
      type: actions.POST_DELETE_ACCOUNT_SUCCESS,
      payload: {
        csrf_token: "csrf-token"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
