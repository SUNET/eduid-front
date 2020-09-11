import React from "react";
import expect from "expect";
import { shallow } from "../../node_modules/enzyme";
import { IntlProvider } from "react-intl";
import { setupComponent, fakeStore, getState } from "tests/SignupMain-test";
import RegisterEmailContainer from "../login/components/RegisterEmail/RegisterEmailContainer";
import * as actions from "../login/redux/actions/registerEmailActions";
import registerEmailReducer from "../login/redux/reducers/registerEmailReducer";

describe("Email Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <RegisterEmailContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("Email address input renders", () => {
    const fullWrapper = setupComponent({
      component: <RegisterEmailContainer />
    });
    const input = fullWrapper.find("input");
    expect(input.exists()).toEqual(true);
  });
  it("'Register for eduID' button renders", () => {
    const fullWrapper = setupComponent({
      component: <RegisterEmailContainer />
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.text()).toContain("eduID");
  });
});

describe("Email Actions", () => {
  it("Should add an email ", () => {
    const expectedAction = {
      type: actions.ADD_EMAIL,
      payload: {
        email: "dummy@example.com"
      }
    };
    expect(actions.addEmail("dummy@example.com")).toEqual(expectedAction);
  });

  it("Should accept tou", () => {
    const expectedAction = {
      type: actions.ACCEPT_TOU
    };
    expect(actions.acceptTOU()).toEqual(expectedAction);
  });

  it("Should reject tou", () => {
    const expectedAction = {
      type: actions.REJECT_TOU
    };
    expect(actions.rejectTOU()).toEqual(expectedAction);
  });
});

describe("Email reducer", () => {
  const mockState = {
    email: "",
    acceptingTOU: false,
    tou_accepted: false
  };

  it("Receives add email action", () => {
    expect(
      addEmailReducer(mockState, {
        type: actions.ADD_EMAIL,
        payload: {
          email: "dummy@example.com"
        }
      })
    ).toEqual({
      email: "dummy@example.com",
      acceptingTOU: true,
      tou_accepted: false
    });
  });

  it("Receives an accept tou action", () => {
    expect(
      registerEmailReducer(mockState, {
        type: actions.ACCEPT_TOU
      })
    ).toEqual({
      email: "",
      acceptingTOU: false,
      tou_accepted: true
    });
  });

  it("Receives a reject tou action", () => {
    expect(
      registerEmailReducer(mockState, {
        type: actions.REJECT_TOU
      })
    ).toEqual({
      email: "",
      acceptingTOU: false,
      tou_accepted: false
    });
  });
});

describe("Test email Container", () => {
  let wrapper, dispatch;

  beforeEach(() => {
    const store = fakeStore(getState());
    dispatch = store.dispatch;
    wrapper = setupComponent({ component: <RegisterEmailContainer />, store: store });
 
  it("Clicks the email button", () => {
    wrapper.find("input#email-input").value = "dummy@example.com";
    const numCalls = dispatch.mock.calls.length;
    const mockEvent = { preventDefault: e => {} };
    wrapper.find("EduIDButton#register-button").props().onClick(mockEvent);
   
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });

  it("Clicks the accept tou button", () => {
    const store = fakeStore(getState({ email: { acceptingTOU: true } }));
    dispatch = store.dispatch;
    wrapper = setupComponent({ component: <RegisterEmailContainer />, store: store });
    wrapper.find("input#email-input").value = "dummy@example.com";
    const numCalls = dispatch.mock.calls.length;
    const mockEvent = { preventDefault: () => {} };
    wrapper
      .find("EduIDButton#accept-tou-button")
      .props()
      .onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });

  it("Clicks the reject tou button", () => {
    const store = fakeStore(getState({ email: { acceptingTOU: true } }));
    dispatch = store.dispatch;
    wrapper = setupComponent({ component: <RegisterEmailContainer />, store: store });
    wrapper.find("input#email-input").value = "dummy@example.com";
    const numCalls = dispatch.mock.calls.length;
    const mockEvent = { preventDefault: () => {} };
    wrapper
      .find("EduIDButton#reject-tou-button")
      .props()
      .onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });
  });
});
