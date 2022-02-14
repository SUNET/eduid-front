const mock = require("jest-mock");
import React from "react";
import { shallow, mount } from "enzyme";
import expect from "expect";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { IntlProvider } from "react-intl";
import { put, call } from "redux-saga/effects";
import letterProofingSlice from "../reducers/LetterProofing";
import LetterProofingContainer from "components/LetterProofing";
// import {
//   sendLetterProofing,
//   fetchLetterProofing,
//   sendGetLetterProofing,
//   fetchGetLetterProofing,
//   sendLetterCode,
//   fetchLetterCode,
// } from "../sagas/LetterProofing";

const messages = require("../login/translation/messageIndex");
import { dashboardStore, DashboardAppDispatch, DashboardRootState } from "../dashboard-init-app";
import { reducer } from "redux-form";

const baseState: DashboardRootState = {
  letter_proofing: {},
  config: {
    letter_proofing_url: "http://localhost/letter",
    csrf_token: "csrf-token",
  },
  nins: {
    message: "",
    nin: "",
    rmNin: "",
    nins: [],
  },
  notifications: undefined as any,
  router: undefined as any,
  chpass: {},
  emails: {},
  groups: undefined as any,
  invites: undefined as any,
  openid_data: undefined as any,
  lookup_mobile: {},
  openid_freja_data: undefined as unknown as any,
  personal_data: undefined as any,
  phones: {},
  account_linking: undefined as any,
  security: undefined as any,
  eidas_data: undefined as any,
  ladok: undefined as any,
  form: undefined as any,
  intl: { locale: "en", messages: {} },
};

const fakeStore = (fakeState: DashboardRootState) => ({
  ...dashboardStore,
  default: () => {},
  dispatch: mock.fn() as unknown as DashboardAppDispatch,
  subscribe: mock.fn(),
  getState: (): DashboardRootState => ({ ...dashboardStore.getState(), ...fakeState }),
});

function getFakeState(newState: DashboardRootState) {
  if (newState == undefined) {
    return;
  }
  return Object.assign(baseState, newState);
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

// describe("Letter Proofing, when letter has been expired", () => {
//   const fakeState = getFakeState({
//     nins: {
//       valid_nin: true,
//       nin: "dummy-nin",
//     },
//   });

//   function setupComponent() {
//     const props = {
//       confirmingLetter: false,
//       verifyingLetter: true,
//       code: "",
//       letter_sent: "20101010",
//       letter_expires: "20101024",
//       letter_expired: true,
//       handleLetterProofing: mock.fn(),
//       sendConfirmationLetter: mock.fn(),
//       handleConfirmationLetter: mock.fn(),
//       handleStopConfirmationLetter: mock.fn(),
//     };
//     const wrapper = shallow(
//       <ReduxIntlProvider store={fakeStore(fakeState)}>
//         <LetterProofingContainer {...props} />
//       </ReduxIntlProvider>
//     );
//     return {
//       props,
//       wrapper,
//     };
//   }

//   it("Renders when letter has been expired", () => {
//     const { wrapper } = setupComponent();
//     expect(wrapper.find(LetterProofingContainer).props().letter_sent).toEqual("20101010");
//     expect(wrapper.find(LetterProofingContainer).props().letter_expires).toEqual("20101024");
//     expect(wrapper.find(LetterProofingContainer).props().letter_expired).toBeTruthy();
//   });
// });

// describe("Letter proofing Actions", () => {
//   it("should create an action to close the modal for the letter-sent code", () => {
//     const expectedAction = {
//       type: actions.STOP_LETTER_VERIFICATION,
//     };
//     expect(actions.stopLetterVerification()).toEqual(expectedAction);
//   });

//   it("should create an action to trigger sending a letter with the code", () => {
//     const expectedAction = {
//       type: actions.POST_LETTER_PROOFING_PROOFING,
//     };
//     expect(actions.postLetterProofingSendLetter()).toEqual(expectedAction);
//   });

//   it("should create an action to POST the entered code", () => {
//     const data = { code: "dummy-code" },
//       expectedAction = {
//         type: actions.POST_LETTER_PROOFING_CODE,
//         payload: {
//           code: data.code,
//         },
//       };
//     expect(actions.postLetterProofingVerificationCode(data)).toEqual(expectedAction);
//   });

//   it("should create an action to signal an error sending the letter", () => {
//     const err = new Error("Bad error");
//     const expectedAction = {
//       type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
//       error: true,
//       payload: {
//         message: err.toString(),
//       },
//     };
//     expect(actions.postLetterProofingSendLetterFail(err)).toEqual(expectedAction);
//   });
//   it("should create an action to signal an error verifying the code", () => {
//     const err = new Error("Bad error");
//     const expectedAction = {
//       type: actions.POST_LETTER_PROOFING_CODE_FAIL,
//       error: true,
//       payload: {
//         message: err.toString(),
//       },
//     };
//     expect(actions.postLetterProofingVerificationCodeFail(err)).toEqual(expectedAction);
//   });
// });

// describe("Reducers", () => {
//   const fakeState = getFakeState();
//   const letterProofingState = fakeState.letter_proofing;

//   it("Receives a STOP_LETTER_VERIFICATION action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.STOP_LETTER_VERIFICATION,
//       })
//     ).toEqual({
//       ...letterProofingState,
//       confirmingLetter: false,
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_CODE action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.STOP_LETTER_VERIFICATION,
//       })
//     ).toEqual({
//       ...letterProofingState,
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_PROOFING_SUCCESS action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
//         payload: {
//           message: "success",
//         },
//       })
//     ).toEqual({
//       ...letterProofingState,
//       message: "success",
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_PROOFING_FAIL action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.POST_LETTER_PROOFING_PROOFING_FAIL,
//         error: true,
//         payload: {
//           message: "err",
//         },
//       })
//     ).toEqual({
//       ...letterProofingState,
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_CODE action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.POST_LETTER_PROOFING_CODE,
//         payload: {
//           code: "dummy-code",
//         },
//       })
//     ).toEqual({
//       ...letterProofingState,
//       code: "dummy-code",
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_CODE_SUCCESS action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.POST_LETTER_PROOFING_CODE_SUCCESS,
//         payload: {
//           success: true,
//           message: "success",
//         },
//       })
//     ).toEqual({
//       ...letterProofingState,
//       message: "success",
//     });
//   });

//   it("Receives a POST_LETTER_PROOFING_CODE_FAIL action", () => {
//     expect(
//       letterProofingReducer(letterProofingState, {
//         type: actions.POST_LETTER_PROOFING_CODE_FAIL,
//         error: true,
//         payload: {
//           message: "err",
//         },
//       })
//     ).toEqual({
//       ...letterProofingState,
//     });
//   });
// });

// describe("LetterProofing Container", () => {
//   let mockProps, wrapper, button;
//   const fakeState = getFakeState();
//   it("Renders button text", () => {
//     const store = fakeStore(fakeState);
//     mockProps = {};

//     wrapper = mount(
//       <ReduxIntlProvider store={store}>
//         <LetterProofingContainer {...mockProps} />
//       </ReduxIntlProvider>
//     );
//     button = wrapper.find("button");
//     expect(button.exists()).toEqual(true);
//     expect(button.text()).toContain("by post");
//   });
// });

// describe("Async component", () => {
//   const fakeState = {
//     config: {
//       letter_proofing_url: "http://localhost/letter",
//       csrf_token: "csrf-token",
//     },
//     nins: {
//       nin: "dummy-nin",
//     },
//     letter_proofing: {
//       code: "dummy-code",
//     },
//   };

//   it("Sagas sendLetterProofing", () => {
//     const generator = sendLetterProofing();

//     let next = generator.next();

//     const data = {
//       nin: "dummy-nin",
//       csrf_token: "csrf-token",
//     };

//     const resp = generator.next(fakeState);
//     expect(resp.value).toEqual(call(fetchLetterProofing, fakeState.config, data));

//     const action = {
//       type: "POST_LETTER_PROOFING_PROOFING_SUCCESS",
//       payload: {
//         csrf_token: "csrf-token",
//         message: "success",
//       },
//     };
//     next = generator.next(action);
//     expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
//     next = generator.next();
//     delete action.payload.csrf_token;
//     expect(next.value).toEqual(put(action));
//   });

//   it("Sagas sendGetLetterProofing", () => {
//     const generator = sendGetLetterProofing();

//     let next = generator.next();

//     const nin = "dummy-nin";
//     const resp = generator.next(fakeState);
//     expect(resp.value).toEqual(call(fetchGetLetterProofing, fakeState.config, nin));

//     const action = {
//       type: "GET_LETTER_PROOFING_PROOFING_SUCCESS",
//       payload: {
//         csrf_token: "csrf-token",
//         message: "success",
//       },
//     };
//     next = generator.next(action);
//     expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
//     next = generator.next();
//     delete action.payload.csrf_token;
//     expect(next.value).toEqual(put(action));
//   });

//   it("Sagas sendLetterCode", () => {
//     const generator = sendLetterCode();

//     let next = generator.next();

//     const data = {
//       code: "dummy-code",
//       csrf_token: "csrf-token",
//     };
//     const resp = generator.next(fakeState);
//     expect(resp.value).toEqual(call(fetchLetterCode, fakeState.config, data));

//     const action = {
//       type: "POST_LETTER_PROOFING_CODE_SUCCESS",
//       payload: {
//         csrf_token: "csrf-token",
//         message: "success",
//       },
//     };
//     next = generator.next(action);
//     expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
//     next = generator.next();
//     delete action.payload.csrf_token;
//     expect(next.value).toEqual(put(action));
//   });
// });

// describe("LetterProofing component, without id number", () => {
//   const fakeState = getFakeState({
//     nins: {
//       valid_nin: false,
//       nins: [],
//     },
//   });

//   function setupComponent() {
//     const wrapper = mount(
//       <ReduxIntlProvider store={fakeStore(fakeState)}>
//         <LetterProofingContainer disabled />
//       </ReduxIntlProvider>
//     );
//     return {
//       wrapper,
//     };
//   }

//   it("Renders button text, add ID number to get letter", () => {
//     const state = { ...fakeState };
//     (state.letter_proofing.letter_sent = ""),
//       (state.letter_proofing.verifyingLetter = false),
//       (state.nins.valid_nin = false),
//       (state.letter_proofing.letter_expired = false),
//       (state.nins.nins[0] = "");

//     const { wrapper } = setupComponent();
//     const description = wrapper.find("div.description");
//     expect(description.exists()).toEqual(true);
//     expect(description.text()).toContain("ID number");
//   });
// });

// describe("LetterProofing component, letter has been sent", () => {
//   const fakeState = getFakeState();

//   function setupComponent() {
//     const wrapper = mount(
//       <ReduxIntlProvider store={fakeStore(fakeState)}>
//         <LetterProofingContainer />
//       </ReduxIntlProvider>
//     );
//     return {
//       wrapper,
//     };
//   }

//   it("Renders button text, the letter was sent", () => {
//     const state = { ...fakeState };
//     (state.letter_proofing.letter_sent = "2021-11-23T17:37:15.799000+00:00"),
//       (state.letter_proofing.letter_expires = "2021-12-07T23:59:59.799000+00:00"),
//       (state.letter_proofing.verifyingLetter = true),
//       (state.nins.valid_nin = true),
//       (state.nins.nins[0] = "19881212");

//     const { wrapper } = setupComponent();
//     const description = wrapper.find("div.description");
//     const letterSent = description.at(0);
//     const letterSentDate = wrapper.find("#letter_sent_date");
//     const letterValid = description.at(1);
//     const letterValidDate = description.find("#letter_expires_date");

//     expect(description.exists()).toEqual(true);

//     expect(letterSent.exists()).toEqual(true);
//     expect(letterSent.text()).toContain("The letter was sent");
//     expect(letterSentDate.text()).toEqual("2021-11-23");

//     expect(letterValid.exists()).toEqual(true);
//     expect(letterValid.text()).toContain("The letter is valid to");
//     expect(letterValidDate.text()).toEqual("2021-12-07");
//   });

//   it("Renders button text, the code has expired", () => {
//     const state = { ...fakeState };
//     (state.letter_proofing.letter_sent = "2021-11-23T17:37:15.799000+00:00"),
//       (state.letter_proofing.letter_expires = "2021-12-07T23:59:59.799000+00:00"),
//       (state.letter_proofing.verifyingLetter = true),
//       (state.letter_proofing.confirmingLetter = false),
//       (state.nins.valid_nin = true),
//       (state.letter_proofing.letter_expired = true),
//       (state.nins.nins[0] = "19881212");

//     const { wrapper } = setupComponent();
//     const description = wrapper.find("div.description");
//     const codeExpired = description.at(0);
//     const orderNewLetter = description.at(1);
//     const letterValidDate = description.find("#letter_expires_date");

//     expect(description.exists()).toEqual(true);

//     expect(codeExpired.exists()).toEqual(true);
//     expect(codeExpired.text()).toContain("expired");
//     expect(orderNewLetter.exists()).toEqual(true);
//     expect(orderNewLetter.text()).toContain("order a new code");
//     expect(letterValidDate.text()).toEqual("2021-12-07");
//   });
// });

describe("LetterProofing Slice", () => {
  it("fetchLetterProofingState is fulfilled", () => {
    const action = {
      type: "letterProofing/fetchLetterProofingState/fulfilled",
      payload: {
        letter_expires_in_days: 12,
        letter_sent_days_ago: 2,
        letter_sent: "2021-11-23T17:37:15.799000+00:00",
        letter_expires: "2021-12-07T23:59:59.799000+00:00",
        letter_expired: "2021-12-07T23:59:59.799000+00:00",
      },
    };
    const state = letterProofingSlice.reducer(baseState.letter_proofing, action);
    expect(state).toEqual(action.payload);
  });
  it("postRequestLetter is fulfilled", () => {
    const action = {
      type: "letterProofing/postRequestLetter/fulfilled",
      payload: {
        letter_expired: false,
        letter_expires: "2022-02-28T23:59:59.196378+00:00",
        letter_expires_in_days: 14,
        letter_sent: "2022-02-14T14:35:54.196378+00:00",
        letter_sent_days_ago: 0,
      },
    };
    const state = letterProofingSlice.reducer(baseState.letter_proofing, action);
    expect(state).toEqual(action.payload);
  });
  it("confirmLetterCode is fulfilled", () => {
    const action = {
      type: "letterProofing/confirmLetterCode/fulfilled",
      payload: {
        message: "letter.verification_success",
      },
    };
    const state = letterProofingSlice.reducer(baseState.letter_proofing, action);
    expect(state).toEqual({
      letter_sent: undefined,
      letter_expires: undefined,
      letter_expired: undefined,
      letter_expires_in_days: undefined,
      letter_sent_days_ago: undefined,
    });
  });
});
