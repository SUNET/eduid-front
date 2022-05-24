import EmailsComponent from "components/Emails";
import { shallow } from "enzyme";
import expect from "expect";
import React from "react";
import { IntlProvider } from "react-intl";
import emailsSlice from "reducers/Emails";
import DataTable from "../login/components/DataTable/DataTable";
import { dashboardTestState, setupComponent } from "./helperFunctions/DashboardTestApp";

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
        emails: {
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
    const state = emailsSlice.reducer(dashboardTestState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("postNewEmail is fulfilled", () => {
    const action = {
      type: "emails/postNewEmail/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: false },
      },
    };
    const state = emailsSlice.reducer(dashboardTestState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("requestResendEmailCode is fulfilled", () => {
    const action = {
      type: "emails/requestResendEmailCode/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: false },
      },
    };
    const state = emailsSlice.reducer(dashboardTestState.emails, action);
    expect(state).toEqual(action.payload);
  });
  it("requestMakePrimaryEmail is fulfilled", () => {
    const action = {
      type: "emails/requestMakePrimaryEmail/fulfilled",
      payload: {
        emails: { email: "test@test.se", verified: false, primary: true },
      },
    };
    const state = emailsSlice.reducer(dashboardTestState.emails, action);
    expect(state).toEqual(action.payload);
  });
});
