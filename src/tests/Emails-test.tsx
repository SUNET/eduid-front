const mock = require("jest-mock");
import React from "react";
import { shallow } from "enzyme";
import expect from "expect";
import emailsSlice from "reducers/Emails";
import EmailsComponent from "components/Emails";
import { put, call } from "redux-saga/effects";
import { DashboardRootState } from "../dashboard-init-app";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/DashboardTestApp";
import DataTable from "../login/components/DataTable/DataTable";

const messages = require("../login/translation/messageIndex");

const baseState: DashboardRootState = {
  letter_proofing: {},
  config: {
    emails_url: "http://localhost/emails",
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

describe("Emails Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <EmailsComponent />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Emails component, primary ", () => {
  function getWrapper() {
    return setupComponent({
      component: <EmailsComponent />,
      overrides: {
        emails: [
          {
            email: "test@test.se",
            verified: true,
            primary: true,
          },
          {
            email: "test1@test.se",
            verified: false,
            primary: false,
          },
        ],
      },
    });
  }
  it("Renders data table", () => {
    const wrapper = getWrapper();
    const table = wrapper.find(DataTable);
    expect(table.exists()).toEqual(true);
  });
});

describe("Emails Slice", () => {
  it("requestRemoveEmail is fulfilled", () => {
    const action = {
      type: "emails/requestRemoveEmail/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: false },
      },
    };
    const state = emailsSlice.reducer(baseState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("postNewEmail is fulfilled", () => {
    const action = {
      type: "emails/postNewEmail/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: false },
      },
    };
    const state = emailsSlice.reducer(baseState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("requestResendEmailCode is fulfilled", () => {
    const action = {
      type: "emails/requestResendEmailCode/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: false },
      },
    };
    const state = emailsSlice.reducer(baseState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("requestMakePrimaryEmail is fulfilled", () => {
    const action = {
      type: "emails/requestMakePrimaryEmail/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: true },
      },
    };
    const state = emailsSlice.reducer(baseState.emails, action);
    expect(state).toEqual(action.payload);
  });
});

// describe("Reducers", () => {
//   const mockState = {
//     message: "",
//     confirming: "",
//     emails: [],
//     email: "",
//   };

//   it("Receives a GET_EMAILS_SUCCESS action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.GET_EMAILS_SUCCESS,
//         payload: {
//           email: "johnsmith@example.com",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "johnsmith@example.com",
//     });
//   });

//   it("Receives a CHANGE_EMAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.CHANGE_EMAIL,
//         payload: {
//           email: "johnsmith@example.com",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "johnsmith@example.com",
//     });
//   });

//   it("Receives a POST_EMAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL,
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_SUCCESS action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_SUCCESS,
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_FAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_FAIL,
//         payload: {
//           message: "Bad error",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a START_CONFIRMATION action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_CONFIRMATION,
//         payload: {
//           email: "test@localhost.com",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "test@localhost.com",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a STOP_CONFIRMATION action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.STOP_CONFIRMATION,
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a START_RESEND_EMAIL_CODE action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_RESEND_EMAIL_CODE,
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a START_RESEND_EMAIL_CODE_SUCCESS action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_RESEND_EMAIL_CODE_SUCCESS,
//         message: "emails.resend_success",
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a START_RESEND_EMAIL_CODE_FAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_RESEND_EMAIL_CODE_FAIL,
//         payload: {
//           message: "Bad error",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a START_VERIFY action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_VERIFY,
//         payload: {
//           code: "123456789",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//       code: "123456789",
//     });
//   });

//   it("Receives a START_VERIFY_FAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.START_VERIFY_FAIL,
//         payload: {
//           message: "Bad error",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_REMOVE_CODE action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_REMOVE,
//         payload: {
//           email: "john@gmail.com",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "john@gmail.com",
//     });
//   });

//   it("Receives a POST_EMAIL_REMOVE_SUCCESS action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_REMOVE_SUCCESS,
//         message: "emails.resend_success",
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_REMOVE_FAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_REMOVE_FAIL,
//         payload: {
//           message: "Bad error",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_PRIMARY action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_PRIMARY,
//         payload: {
//           email: "john@gmail.com",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "john@gmail.com",
//     });
//   });

//   it("Receives a POST_EMAIL_PRIMARY_SUCCESS action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_PRIMARY_SUCCESS,
//         message: "emails.resend_success",
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });

//   it("Receives a POST_EMAIL_PRIMARY_FAIL action", () => {
//     expect(
//       emailsReducer(mockState, {
//         type: actions.POST_EMAIL_PRIMARY_FAIL,
//         payload: {
//           message: "Bad error",
//         },
//       })
//     ).toEqual({
//       message: "",
//       confirming: "",
//       emails: [],
//       email: "",
//     });
//   });
// });

// const state = {
//   emails: {
//     message: "",
//     confirming: "",
//     emails: [],
//     email: "",
//   },
//   config: {
//     csrf_token: "123456789",
//     emails_url: "test/localhost",
//     email: "email@localhost.com",
//   },
//   intl: {
//     locale: "en",
//     messages: messages,
//   },
// };
// const getState = () => state;

// const fakeStore = (state) => ({
//   default: () => {},
//   dispatch: mock.fn(),
//   subscribe: mock.fn(),
//   getState: () => ({ ...state }),
// });

// describe("Emails Component", () => {
// it("Renders", () => {
//   const store = fakeStore(getState()),
//     { wrapper } = setupComponent(store),
//     form = wrapper.find("form"),
//     fieldset = wrapper.find("fieldset"),
//     email = wrapper.find('TextControl[name="email"]');
// TODO: not finished
// });
// });
