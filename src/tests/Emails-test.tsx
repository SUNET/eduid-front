import React from "react";
import { shallow } from "enzyme";
import expect from "expect";
import emailsSlice, { initialState as emailsInitialState } from "reducers/Emails";
import EmailsComponent from "components/Emails";
import { DashboardRootState } from "../dashboard-init-app";
import { IntlProvider } from "react-intl";
import { setupComponent } from "./helperFunctions/DashboardTestApp";
import DataTable from "../login/components/DataTable/DataTable";

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
  emails: emailsInitialState,
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
