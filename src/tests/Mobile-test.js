const mock = require("jest-mock");
import React from "react";
import { shallow, mount, render } from "enzyme";
import expect, { createSpy, spyOn, isSpy } from "expect";
import * as actions from "actions/Mobile";
import mobileReducer from "reducers/Mobile";
import {
  requestMobile,
  fetchMobiles,
  saveMobile,
  sendMobile,
  requestRemoveMobile,
  requestVerifyMobile,
  requestVerify,
  requestResendMobileCode,
  requestRemove,
  requestMakePrimaryMobile,
  requestMakePrimary,
  requestResend
} from "sagas/Mobile";
import { put, call, select } from "redux-saga/effects";

import Mobile from "components/Mobile";
import MobileContainer from "containers/Mobile";
import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";
import fetchMock from "fetch-mock";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("Mobile Actions", () => {
  it("Should post the mobile ", () => {
    const expectedAction = {
      type: actions.POST_MOBILE
    };
    expect(actions.postMobile()).toEqual(expectedAction);
  });

  it("Should fail when trying to post the mobile", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_MOBILE_FAIL,
      error: true,
      payload: { message: err }
    };
    expect(actions.postMobileFail(err)).toEqual(expectedAction);
  });

  it("Should start the confirmation ", () => {
    const data = {
      mobile: 999123123,
      text: "texting"
    };
    const expectedAction = {
      type: actions.START_CONFIRMATION,
      payload: data
    };
    expect(actions.startConfirmation(data)).toEqual(expectedAction);
  });

  it("Should stop the confirmation ", () => {
    const expectedAction = {
      type: actions.STOP_CONFIRMATION
    };
    expect(actions.stopConfirmation()).toEqual(expectedAction);
  });

  it("Should resend the email code ", () => {
    const expectedAction = {
      type: actions.START_RESEND_MOBILE_CODE
    };
    expect(actions.startResendMobileCode()).toEqual(expectedAction);
  });

  it("Should fail when resend the email code ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.START_RESEND_MOBILE_CODE_FAIL,
      error: true,
      payload: { message: err }
    };
    expect(actions.resendMobileCodeFail(err)).toEqual(expectedAction);
  });

  it("Should start the verify process", () => {
    const data = {
      mobile: 999123123,
      identifier: "1"
    };
    const expectedAction = {
      type: actions.START_VERIFY,
      payload: data
    };

    expect(actions.startVerify(data)).toEqual(expectedAction);
  });

  it("Should fail when start the verify process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_PHONE_VERIFY_FAIL,
      error: true,
      payload: { message: err }
    };
    expect(actions.startVerifyFail(err)).toEqual(expectedAction);
  });

  it("Should start remove process ", () => {
    const data = {
      mobile: 999123123,
      identifier: "1"
    };
    const expectedAction = {
      type: actions.POST_MOBILE_REMOVE,
      payload: data
    };
    expect(actions.startRemove(data)).toEqual(expectedAction);
  });

  it("Should fail when start the remove process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_MOBILE_REMOVE_FAIL,
      error: true,
      payload: { message: err }
    };
    expect(actions.startRemoveFail(err)).toEqual(expectedAction);
  });

  it("Should start the make primary process", () => {
    const data = {
      mobile: 999123123,
      identifier: "1"
    };
    const expectedAction = {
      type: actions.POST_MOBILE_PRIMARY,
      payload: data
    };
    expect(actions.makePrimary(data)).toEqual(expectedAction);
  });

  it("Should fail when start the primary process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_MOBILE_PRIMARY_FAIL,
      error: true,
      payload: { message: err }
    };
    expect(actions.makePrimaryFail(err)).toEqual(expectedAction);
  });
});

describe("", () => {
  const mockState = {
    message: "",
    confirming: "",
    mobiles: [],
    phone: "",
    code: ""
  };

  it("Receives a GET_MOBILES_SUCCESS action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.GET_MOBILES_SUCCESS,
        payload: {
          phone: 999123123
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: 999123123,
      code: ""
    });
  });

  it("Receives a POST_MOBILE action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a POST_MOBILE_SUCCESS action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_SUCCESS
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a POST_MOBILE_FAIL action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a START_CONFIRMATION action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.START_CONFIRMATION,
        payload: {
          phone: 999123123
        }
      })
    ).toEqual({
      message: "",
      confirming: 999123123,
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a STOP_CONFIRMATION action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.STOP_CONFIRMATION
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a START_RESEND_MOBILE_CODE action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.START_RESEND_MOBILE_CODE
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a START_RESEND_MOBILE_CODE_SUCCESS action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.START_RESEND_MOBILE_CODE_SUCCESS,
        message: "mobile.resend_success"
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a START_RESEND_MOBILE_CODE_FAIL action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.START_RESEND_MOBILE_CODE_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a START_VERIFY action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.START_VERIFY,
        payload: {
          code: "123456789"
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: "123456789"
    });
  });

  it("Receives a POST_PHONE_VERIFY_FAIL action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_PHONE_VERIFY_FAIL,
        payload: { message: "Bad error" }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a POST_MOBILE_REMOVE action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_REMOVE,
        payload: {
          phone: 999123123
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: 999123123,
      code: ""
    });
  });

  it("Receives a POST_MOBILE_REMOVE_FAIL action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_REMOVE_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a POST_MOBILE_PRIMARY action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_PRIMARY,
        payload: {
          phone: 999123123
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: 999123123,
      code: ""
    });
  });

  it("Receives a POST_MOBILE_PRIMARY_SUCCESS action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_PRIMARY_SUCCESS,
        message: "mobile.resend_success"
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });

  it("Receives a POST_MOBILE_PRIMARY_FAIL action", () => {
    expect(
      mobileReducer(mockState, {
        type: actions.POST_MOBILE_PRIMARY_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      message: "",
      confirming: "",
      mobiles: [],
      phone: "",
      code: ""
    });
  });
});
const getState = () => state;
const state = {
  phones: {
    message: "",
    confirming: "",
    phones: [],
    phone: "",
    code: ""
  },
  config: {
    csrf_token: "123456789",
    MOBILE_URL: "test/localhost"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

describe("Async component", () => {
  it("Sagas saveMobile", () => {
    const generator = saveMobile();
    let next = generator.next();

    // next.value.SELECT.selector = function (state) {
    //      return state;
    // };
    // expect(next.value).toEqual(select(state => state));

    const data = {
      number: state.phones.phone,
      verified: false,
      primary: false,
      csrf_token: state.config.csrf_token
    };

    generator.next(state);
    generator.next(data);
    generator.next();
    next = generator.next();
    expect(next.value).toEqual(call(sendMobile, state.config, data));

    const action = {
      type: actions.POST_MOBILE_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        phones: [
          {
            number: "999123456",
            verified: false,
            primary: false
          }
        ]
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    generator.next();
    generator.next();
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestResendMobileCode", () => {
    const generator = requestResendMobileCode(getState);
    let next = generator.next();

    // next.value.SELECT.selector = function (state) {
    //      return state;
    // };
    // expect(next.value).toEqual(select(state => state));

    const data = {
      number: state.phones.confirming,
      csrf_token: state.config.csrf_token
    };

    const resp = generator.next(state);

    expect(resp.value).toEqual(call(requestResend, state.config, data));

    const action = {
      type: actions.START_RESEND_MOBILE_CODE_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        phones: [
          {
            number: "999123456",
            verified: false,
            primary: false
          }
        ]
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestVerifyMobile", () => {
    const generator = requestVerifyMobile(getState);
    let next = generator.next();

    // next.value.SELECT.selector = function (state) {
    //      return state;
    // };
    // expect(next.value).toEqual(select(state => state));

    const data = {
      number: state.phones.confirming,
      code: state.phones.code,
      csrf_token: state.config.csrf_token
    };

    const resp = generator.next(state);

    expect(resp.value).toEqual(call(requestVerify, state.config, data));

    const action = {
      type: actions.POST_PHONE_VERIFY_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        phones: [
          {
            number: "999123456",
            verified: false,
            primary: false
          }
        ]
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestRemoveMobile", () => {
    const generator = requestRemoveMobile(getState);
    let next = generator.next();

    // next.value.SELECT.selector = function (state) {
    //      return state;
    // };
    // expect(next.value).toEqual(select(state => state));

    const data = {
      number: state.phones.confirming,
      csrf_token: state.config.csrf_token
    };
    const resp = generator.next(state);

    expect(resp.value).toEqual(call(requestRemove, state.config, data));

    const action = {
      type: actions.POST_PHONE_REMOVE_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        phones: [
          {
            number: "999123456",
            verified: false,
            primary: false
          }
        ]
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas requestMakePrimaryMobile", () => {
    const generator = requestMakePrimaryMobile(getState);
    let next = generator.next();

    // next.value.SELECT.selector = function (state) {
    //      return state;
    // };
    // expect(next.value).toEqual(select(state => state));

    const data = {
      number: state.phones.phone,
      csrf_token: state.config.csrf_token
    };

    const resp = generator.next(state);

    expect(resp.value).toEqual(call(requestMakePrimary, state.config, data));

    const action = {
      type: actions.POST_MOBILE_PRIMARY_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        phones: [
          {
            number: "999123456",
            verified: false,
            primary: false
          }
        ]
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});

function setupComponent(store) {
  const props = {
    mobile: "",
    handleSave: mock.fn(),
    handleChange: mock.fn()
  };

  const wrapper = shallow(
    <Provider store={store}>
      <MobileContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

describe("Mobile Component", () => {
  it("Renders", () => {
    const store = fakeStore(getState()),
      { wrapper, props } = setupComponent(store),
      form = wrapper.find("form"),
      fieldset = wrapper.find("fieldset"),
      email = wrapper.find('TextControl[name="mobile"]');
  });
});

describe("Mobile Container", () => {
  let fulltext, mobile, fulldom, language, mockProps, wrapper, dispatch;

  beforeEach(() => {
    const store = fakeStore(getState());

    mockProps = {
      mobile: 966123123
    };

    wrapper = mount(
      <Provider store={store}>
        <MobileContainer {...mockProps} />
      </Provider>
    );
    fulldom = wrapper.find(MobileContainer);
    fulltext = wrapper.find(MobileContainer).text();
    mobile = wrapper.find(MobileContainer).props().mobile;
    language = wrapper.find(MobileContainer).props().language;
    dispatch = store.dispatch;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Renders test", () => {
    expect(mobile).toEqual(966123123);
  });

  // it("Clicks", () => {
  //   fetchMock.post("http://localhost/profile/mobile", {
  //     type: actions.POST_MOBILE
  //   });
  //   const numCalls = dispatch.mock.calls.length;
  //   wrapper.find("input#mobile").value = "+34667667544";
  //   wrapper
  //     .find("EduIDButton#mobile-button")
  //     .simulate("click", { preventDefault() {} })
  //     .props()
  //     .onClick();
  //   expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  // });
});
