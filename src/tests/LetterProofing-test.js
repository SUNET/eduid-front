const mock = require("jest-mock");
import React from "react";
import { shallow, mount} from "enzyme";
import expect from "expect";
import fetchMock from "fetch-mock";
import { Provider } from "react-intl-redux";
import { IntlProvider, addLocaleData } from "react-intl";
import { put, call } from "redux-saga/effects";
import * as actions from "actions/LetterProofing";
import letterProofingReducer from "reducers/LetterProofing";
import LetterProofingContainer from "containers/LetterProofing";
import {
  sendLetterProofing,
  fetchLetterProofing,
  sendGetLetterProofing,
  fetchGetLetterProofing,
  sendLetterCode,
  fetchLetterCode
} from "../sagas/LetterProofing";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("LetterProofing Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <LetterProofingContainer />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Letter Proofing, when letter has been expired", () => {
  const fakeStore = (state) => ({
    default: () => {},
    dispatch: mock.fn(),
    subscribe: mock.fn(),
    getState: () => ({ ...state }),
  });
  const fakeState = {
    letter_proofing: {
      confirmingLetter: false,
      verifyingLetter: false,
      code: "",
      letter_sent: "",
      letter_expires: "",
      letter_expired: false,
      message: ""
    },
    config: { letter_proofing_url: "http://localhost/letter" },
    nins: {
      valid_nin: true,
      nin: "dummy-nin"
    },
    intl: {
      locale: "en",
      messages: messages
    }
  }

  function setupComponent() {
    const props =  {
      confirmingLetter: false,
      verifyingLetter: true,
      code: "",
      letter_sent: "20101010",
      letter_expires: "20101024",
      letter_expired: true,
      handleLetterProofing: mock.fn(),
      sendConfirmationLetter: mock.fn(),
      handleConfirmationLetter: mock.fn(),
      handleStopConfirmationLetter: mock.fn()
    };
    const wrapper = shallow(
      <Provider store={fakeStore(fakeState)}>
        <LetterProofingContainer {...props} />
      </Provider>
    );
    return {
      props,
      wrapper,
    };
  }
  const state = { ...fakeState };
  state.letter_proofing.letter_expired = true; 

  it("Renders when letter has been expired", () => {
    const { wrapper } = setupComponent();
    expect(wrapper.find(LetterProofingContainer).props().letter_sent).toEqual("20101010");
    expect(wrapper.find(LetterProofingContainer).props().letter_expires).toEqual("20101024");
    expect(wrapper.find(LetterProofingContainer).props().letter_expired).toBeTruthy();
  });
})

describe("Letter proofing Actions", () => {
  it("should create an action to close the modal for the letter-sent code", () => {
    const expectedAction = {
      type: actions.STOP_LETTER_VERIFICATION
    };
    expect(actions.stopLetterVerification()).toEqual(expectedAction);
  });

  it("should create an action to trigger sending a letter with the code", () => {
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_PROOFING
    };
    expect(actions.postLetterProofingSendLetter()).toEqual(expectedAction);
  });

  it("should create an action to POST the entered code", () => {
    const data = { code: "dummy-code" },
      expectedAction = {
        type: actions.POST_LETTER_PROOFING_CODE,
        payload: {
          code: data.code
        }
      };
    expect(actions.postLetterProofingVerificationCode(data)).toEqual(
      expectedAction
    );
  });

  it("should create an action to signal an error sending the letter", () => {
    const err = new Error("Bad error");
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
      error: true,
      payload: {
        message: err.toString()
      }
    };
    expect(actions.postLetterProofingSendLetterFail(err)).toEqual(
      expectedAction
    );
  });
  it("should create an action to signal an error verifying the code", () => {
    const err = new Error("Bad error");
    const expectedAction = {
      type: actions.POST_LETTER_PROOFING_CODE_FAIL,
      error: true,
      payload: {
        message: err.toString()
      }
    };
    expect(actions.postLetterProofingVerificationCodeFail(err)).toEqual(
      expectedAction
    );
  });
});

describe("Reducers", () => {
  const mockState = {
    confirmingLetter: false,
    verifyingLetter: false,
    code: "",
    letter_sent: "",
    letter_expires: "",
    letter_expired: false,
    message: ""
  };

  it("Receives a STOP_LETTER_VERIFICATION action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.STOP_LETTER_VERIFICATION
      })
    ).toEqual({
      ...mockState,
      confirmingLetter: false
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.STOP_LETTER_VERIFICATION
      })
    ).toEqual({
      ...mockState
    });
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
        payload: {
          message: "success"
        }
      })
    ).toEqual({
      ...mockState,
      message: "success"
    });
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_FAIL action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          message: "err"
        }
      })
    ).toEqual({
      ...mockState
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.POST_LETTER_PROOFING_CODE,
        payload: {
          code: "dummy-code"
        }
      })
    ).toEqual({
      ...mockState,
      code: "dummy-code"
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE_SUCCESS action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.POST_LETTER_PROOFING_CODE_SUCCESS,
        payload: {
          success: true,
          message: "success"
        }
      })
    ).toEqual({
      ...mockState,
      message: "success"
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE_FAIL action", () => {
    expect(
      letterProofingReducer(mockState, {
        type: actions.POST_LETTER_PROOFING_CODE_FAIL,
        error: true,
        payload: {
          message: "err"
        }
      })
    ).toEqual({
      ...mockState
    });
  });
});

const fakeState = {
  letter_proofing: {
    message: "",
    errMsg: "",
    letter_sent: ""
  },
  config: { letter_proofing_url: "http://localhost/letter" },
  nins: {
    valid_nin: false,
    nin: "dummy-nin"
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

function setupComponent(store) {
  const props = {
    letter_expires:"",
    handleLetterProofing: mock.fn(),
    sendConfirmationLetter: mock.fn(),
    handleConfirmationLetter: mock.fn(),
    handleStopConfirmationLetter: mock.fn()
  };
  const wrapper = shallow(
    <Provider store={store}>
      <LetterProofingContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("LetterProofing Container", () => {
  let mockProps, wrapper, buttontext, dispatch;

  beforeEach(() => {
    const store = fakeStore(fakeState);

    mockProps = {};

    wrapper = mount(
      <Provider store={store}>
        <LetterProofingContainer {...mockProps} />
      </Provider>
    );
    buttontext = wrapper.find("button").exists();
    expect(buttontext.exists()).toEqual(true);
    expect(buttontext.text()).toContain("By post");
  });

  afterEach(() => {
    fetchMock.restore();
  });
});

const state = {
  config: {
    letter_proofing_url: "http://localhost/letter",
    csrf_token: "csrf-token"
  },
  nins: {
    nin: "dummy-nin"
  },
  letter_proofing: {
    code: "dummy-code"
  }
};

describe("Async component", () => {
  it("Sagas sendLetterProfing", () => {
    const generator = sendLetterProofing();

    let next = generator.next();

    const data = {
      nin: "dummy-nin",
      csrf_token: "csrf-token"
    };

    const resp = generator.next(state);
    expect(resp.value).toEqual(call(fetchLetterProofing, state.config, data));

    const action = {
      type: "POST_LETTER_PROOFING_PROOFING_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas sendGetLetterProfing", () => {
    const generator = sendGetLetterProofing();

    let next = generator.next();

    const nin = "dummy-nin";
    const resp = generator.next(state);
    expect(resp.value).toEqual(call(fetchGetLetterProofing, state.config, nin));

    const action = {
      type: "GET_LETTER_PROOFING_PROOFING_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });

  it("Sagas sendLetterCode", () => {
    const generator = sendLetterCode();

    let next = generator.next();

    const data = {
      code: "dummy-code",
      csrf_token: "csrf-token"
    };

    const resp = generator.next(state);
    expect(resp.value).toEqual(call(fetchLetterCode, state.config, data));

    const action = {
      type: "POST_LETTER_PROOFING_CODE_SUCCESS",
      payload: {
        csrf_token: "csrf-token",
        message: "success"
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
    next = generator.next();
    delete action.payload.csrf_token;
    expect(next.value).toEqual(put(action));
  });
});
