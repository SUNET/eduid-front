const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import * as actions from "actions/Emails";
import emailsReducer from "reducers/Emails";
import EmailsContainer from "components/Emails";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { put, call } from "redux-saga/effects";

const messages = require("../login/translation/messageIndex");

describe("Email Actions", () => {
  it("Should change the emails ", () => {
    const data = {
      email: "test@localhost.com",
      text: "texting",
    };
    const expectedAction = {
      type: actions.CHANGE_EMAIL,
      payload: data,
    };
    expect(actions.changeEmail(data)).toEqual(expectedAction);
  });

  it("Should post the emails ", () => {
    const expectedAction = {
      type: actions.POST_EMAIL,
    };
    expect(actions.postEmail()).toEqual(expectedAction);
  });

  it("Should fail when trying to post the emails", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_EMAIL_FAIL,
      error: true,
      payload: { message: err },
    };
    expect(actions.postEmailFail(err)).toEqual(expectedAction);
  });

  it("Should start the confirmation ", () => {
    const data = {
      email: "test@localhost.com",
      text: "texting",
    };
    const expectedAction = {
      type: actions.START_CONFIRMATION,
      payload: data,
    };
    expect(actions.startConfirmation(data)).toEqual(expectedAction);
  });

  it("Should stop the confirmation ", () => {
    const expectedAction = {
      type: actions.STOP_CONFIRMATION,
    };
    expect(actions.stopConfirmation()).toEqual(expectedAction);
  });

  it("Should resend the email code ", () => {
    const expectedAction = {
      type: actions.START_RESEND_EMAIL_CODE,
    };
    expect(actions.startResendEmailCode()).toEqual(expectedAction);
  });

  it("Should fail when resend the email code ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.START_RESEND_EMAIL_CODE_FAIL,
      error: true,
      payload: { message: err },
    };
    expect(actions.resendEmailCodeFail(err)).toEqual(expectedAction);
  });

  it("Should start the verify process", () => {
    const data = {
      email: "john@gmail.com",
      identifier: "1",
    };
    const expectedAction = {
      type: actions.START_VERIFY,
      payload: data,
    };

    expect(actions.startVerify(data)).toEqual(expectedAction);
  });

  it("Should fail when start the verify process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.START_VERIFY_FAIL,
      error: true,
      payload: { message: err },
    };
    expect(actions.startVerifyFail(err)).toEqual(expectedAction);
  });

  it("Should start remove process ", () => {
    const data = {
      email: "john@gmail.com",
      identifier: "1",
    };
    const expectedAction = {
      type: actions.POST_EMAIL_REMOVE,
      payload: data,
    };
    expect(actions.startRemove(data)).toEqual(expectedAction);
  });

  it("Should fail when start the remove process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_EMAIL_REMOVE_FAIL,
      error: true,
      payload: { message: err },
    };
    expect(actions.startRemoveFail(err)).toEqual(expectedAction);
  });

  it("Should start the make primary process", () => {
    const data = {
      email: "john@gmail.com",
      identifier: "1",
    };
    const expectedAction = {
      type: actions.POST_EMAIL_PRIMARY,
      payload: data,
    };
    expect(actions.makePrimary(data)).toEqual(expectedAction);
  });

  it("Should fail when start the primary process ", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.POST_EMAIL_PRIMARY_FAIL,
      error: true,
      payload: { message: err },
    };
    expect(actions.makePrimaryFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    message: "",
    confirming: "",
    emails: [],
    email: "",
  };

  it("Receives a GET_EMAILS_SUCCESS action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.GET_EMAILS_SUCCESS,
        payload: {
          email: "johnsmith@example.com",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "johnsmith@example.com",
    });
  });

  it("Receives a CHANGE_EMAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.CHANGE_EMAIL,
        payload: {
          email: "johnsmith@example.com",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "johnsmith@example.com",
    });
  });

  it("Receives a POST_EMAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL,
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_SUCCESS action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_SUCCESS,
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_FAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a START_CONFIRMATION action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_CONFIRMATION,
        payload: {
          email: "test@localhost.com",
        },
      })
    ).toEqual({
      message: "",
      confirming: "test@localhost.com",
      emails: [],
      email: "",
    });
  });

  it("Receives a STOP_CONFIRMATION action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.STOP_CONFIRMATION,
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a START_RESEND_EMAIL_CODE action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_RESEND_EMAIL_CODE,
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a START_RESEND_EMAIL_CODE_SUCCESS action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_RESEND_EMAIL_CODE_SUCCESS,
        message: "emails.resend_success",
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a START_RESEND_EMAIL_CODE_FAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_RESEND_EMAIL_CODE_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a START_VERIFY action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_VERIFY,
        payload: {
          code: "123456789",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
      code: "123456789",
    });
  });

  it("Receives a START_VERIFY_FAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.START_VERIFY_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_REMOVE_CODE action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_REMOVE,
        payload: {
          email: "john@gmail.com",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "john@gmail.com",
    });
  });

  it("Receives a POST_EMAIL_REMOVE_SUCCESS action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_REMOVE_SUCCESS,
        message: "emails.resend_success",
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_REMOVE_FAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_REMOVE_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_PRIMARY action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_PRIMARY,
        payload: {
          email: "john@gmail.com",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "john@gmail.com",
    });
  });

  it("Receives a POST_EMAIL_PRIMARY_SUCCESS action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_PRIMARY_SUCCESS,
        message: "emails.resend_success",
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });

  it("Receives a POST_EMAIL_PRIMARY_FAIL action", () => {
    expect(
      emailsReducer(mockState, {
        type: actions.POST_EMAIL_PRIMARY_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      message: "",
      confirming: "",
      emails: [],
      email: "",
    });
  });
});

const state = {
  emails: {
    message: "",
    confirming: "",
    emails: [],
    email: "",
  },
  config: {
    csrf_token: "123456789",
    emails_url: "test/localhost",
    email: "email@localhost.com",
  },
  intl: {
    locale: "en",
    messages: messages,
  },
};
const getState = () => state;

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

describe("Emails Component", () => {
  // it("Renders", () => {
  //   const store = fakeStore(getState()),
  //     { wrapper } = setupComponent(store),
  //     form = wrapper.find("form"),
  //     fieldset = wrapper.find("fieldset"),
  //     email = wrapper.find('TextControl[name="email"]');
  // TODO: not finished
  // });
});

describe("Emails Container", () => {
  let email, fulldom, language, mockProps, wrapper;

  beforeEach(() => {
    const store = fakeStore(getState());

    mockProps = {
      email: "test@localhost.com",
      language: "en",
    };

    wrapper = mount(
      <ReduxIntlProvider store={store}>
        <EmailsContainer {...mockProps} />
      </ReduxIntlProvider>
    );
    fulldom = wrapper.find(EmailsContainer);
    email = fulldom.props().email;
    language = fulldom.props().language;
  });

  it("Renders test", () => {
    expect(language).toEqual("en");
    expect(email).toEqual("test@localhost.com");
  });

  // it("Clicks", () => {
  //   fetchMock.post("http://localhost/profile/email", {
  //     type: actions.POST_EMAIL
  //   });
  //   const numCalls = dispatch.mock.calls.length;
  //   wrapper.find("input#email").value = "testing@example.com";
  //   wrapper
  //     .find("EduIDButton#email-button")
  //     .simulate("click", { preventDefault() {} })
  //     .props()
  //     .onClick();
  //   expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  // });
});
