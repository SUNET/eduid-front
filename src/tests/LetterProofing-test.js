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

const baseState = {
  letter_proofing: {
    message: "",
    letter_sent: "",
    verifyingLetter: false,
    letter_expires: "",
    letter_expired: false,
    confirmingLetter: false,
    code: ""
  },
  config: { 
    letter_proofing_url: "http://localhost/letter",
    csrf_token: "csrf-token" 
  },
  nins: {
    nin:""
  },
  intl: {
    locale: "en",
    messages: messages
  }
};

const fakeStore = fakeState => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState })
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {}
  }
  return Object.assign(baseState, newState)
}

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
  const fakeState = getFakeState({
    nins: {
      valid_nin: true,
      nin: "dummy-nin"
    },
  })

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
  const fakeState = getFakeState();
  const letterProofingState = fakeState.letter_proofing;

  it("Receives a STOP_LETTER_VERIFICATION action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.STOP_LETTER_VERIFICATION
      })
    ).toEqual({
      ...letterProofingState,
      confirmingLetter: false
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.STOP_LETTER_VERIFICATION
      })
    ).toEqual({
      ...letterProofingState
    });
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_SUCCESS action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
        payload: {
          message: "success"
        }
      })
    ).toEqual({
      ...letterProofingState,
      message: "success"
    });
  });

  it("Receives a POST_LETTER_PROOFING_PROOFING_FAIL action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
        error: true,
        payload: {
          message: "err"
        }
      })
    ).toEqual({
      ...letterProofingState
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.POST_LETTER_PROOFING_CODE,
        payload: {
          code: "dummy-code"
        }
      })
    ).toEqual({
      ...letterProofingState,
      code: "dummy-code"
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE_SUCCESS action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.POST_LETTER_PROOFING_CODE_SUCCESS,
        payload: {
          success: true,
          message: "success"
        }
      })
    ).toEqual({
      ...letterProofingState,
      message: "success"
    });
  });

  it("Receives a POST_LETTER_PROOFING_CODE_FAIL action", () => {
    expect(
      letterProofingReducer(letterProofingState, {
        type: actions.POST_LETTER_PROOFING_CODE_FAIL,
        error: true,
        payload: {
          message: "err"
        }
      })
    ).toEqual({
      ...letterProofingState
    });
  });
});

describe("LetterProofing Container", () => {
  let mockProps, wrapper, buttontext;
  const fakeState = getFakeState();
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

describe("Async component", () => {
  const fakeState = {
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

  it("Sagas sendLetterProfing", () => {
    const generator = sendLetterProofing();

    let next = generator.next();

    const data = {
      nin: "dummy-nin",
      csrf_token: "csrf-token"
    };

    const resp = generator.next(fakeState);
    expect(resp.value).toEqual(call(fetchLetterProofing, fakeState.config, data));

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
    const resp = generator.next(fakeState);
    expect(resp.value).toEqual(call(fetchGetLetterProofing, fakeState.config, nin));

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
    const resp = generator.next(fakeState);
    expect(resp.value).toEqual(call(fetchLetterCode, fakeState.config, data));

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

describe("LetterProofing component, without id number", () => {
  const fakeState = getFakeState({
    nins: {
      valid_nin: false,
      nins: []
    }
  })

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <LetterProofingContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders button text, add ID number to get letter", () => {
    const state = {...fakeState};
    state.letter_proofing.letter_sent = "",
    state.letter_proofing.verifyingLetter = false,
    state.nins.valid_nin = false,
    state.letter_proofing.letter_expired = false,
    state.nins.nins[0] = ""

    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    expect(description.exists()).toEqual(true);
    expect(description.text()).toContain("ID number");
  });
});

describe("LetterProofing component, letter has been sent", () => {
  const fakeState = getFakeState()

  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <LetterProofingContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders button text, the letter was sent", () => {
    const state = {...fakeState};
    state.letter_proofing.letter_sent = "20201010",
    state.letter_proofing.verifyingLetter = true,
    state.nins.valid_nin = true,
    state.nins.nins[0] = "19881212"

    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    const letterSent = description.find("span").at(0);
    const letterValid = description.find("span").at(1);
    const letterSentDate = description.at(0).prop('children');
    const checkSentDate = shallow(<div>{letterSentDate}</div>).text();
    const letterVaildDate = description.at(1).prop('children');
    const checkVaildDate = shallow(<div>{letterVaildDate}</div>).text();
    expect(letterSent.exists()).toEqual(true);
    expect(letterSent.text()).toContain("sent");
    expect(letterValid.exists()).toEqual(true);
    expect(letterValid.text()).toContain("valid to");
    expect(checkSentDate).toContain("NaN");
    expect(checkVaildDate).toContain("NaN");
  });
});

describe("LetterProofing component, when letter has expired", () => {
  const fakeState = getFakeState()
  
  function setupComponent() {
    const wrapper = mount(
      <Provider store={fakeStore(fakeState)}>
        <LetterProofingContainer />
      </Provider>
    );
    return {
      wrapper
    };
  }

  it("Renders button text, the code has expired", () => {
    const state = {...fakeState};
    state.letter_proofing.letter_sent = "20201010",
    state.letter_proofing.letter_expires = "20201024",
    state.letter_proofing.verifyingLetter = true,
    state.letter_proofing.confirmingLetter = false,
    state.nins.valid_nin = true,
    state.letter_proofing.letter_expired = true,
    state.nins.nins[0] = "19881212"
    
    const { wrapper } = setupComponent();
    const description = wrapper.find("div.description");
    const codeExpired = description.find("span").at(0);
    const orderNewLetter = description.find("span").at(1);
    const expiredDate = description.at(0).prop('children');
    const checkExpiredDate = shallow(<div>{expiredDate}</div>).text();
    expect(codeExpired.exists()).toEqual(true);
    expect(codeExpired.text()).toContain("expired");
    expect(orderNewLetter.exists()).toEqual(true);
    expect(orderNewLetter.text()).toContain("order a new code");
    expect(checkExpiredDate).toContain("NaN");
  });
});
