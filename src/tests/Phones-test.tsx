const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import phonesReducer from "reducers/Phones";
import { put, call } from "redux-saga/effects";
import PhonesComponent from "components/Phones";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { IntlProvider } from "react-intl";
import { shallow } from "enzyme";
import { dashboardTestState, setupComponent } from "./helperFunctions/DashboardTestApp";
import DataTable from "../login/components/DataTable/DataTable";
import phonesSlice from "reducers/Phones";

describe("Phones Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <PhonesComponent />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Phones component, primary ", () => {
  function getWrapper() {
    return setupComponent({
      component: <PhonesComponent />,
      overrides: {
        phones: {
          phones: [
            {
              number: "+46070000000",
              verified: true,
              primary: true,
            },
            {
              email: "+46070000001",
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

describe("Phones Slice", () => {
  it("requestRemovePhone is fulfilled", () => {
    const action = {
      type: "phones/requestRemovePhone/fulfilled",
      payload: {
        phones: [],
      },
    };
    const state = phonesSlice.reducer(dashboardTestState.phones, action);
    expect(state).toEqual(action.payload);
  });
  it("postNewPhone is fulfilled", () => {
    const action = {
      type: "phones/postNewPhone/fulfilled",
      payload: {
        phones: [{ number: "+46070000000", verified: false, primary: false }],
      },
    };
    const state = phonesSlice.reducer(dashboardTestState.phones, action);
    expect(state).toEqual(action.payload);
  });
  it("requestResendPhoneCode is fulfilled", () => {
    const action = {
      type: "phones/requestResendPhoneCode/fulfilled",
      payload: {
        phones: [{ number: "+46070000000", verified: false, primary: false }],
      },
    };
    const state = phonesSlice.reducer(dashboardTestState.phones, action);
    expect(state).toEqual(action.payload);
  });
  it("requestMakePrimaryEmail is fulfilled", () => {
    const action = {
      type: "phones/requestMakePrimaryPhone/fulfilled",
      payload: {
        phones: [{ number: "+46070000000", verified: false, primary: true }],
      },
    };
    const state = phonesSlice.reducer(dashboardTestState.phones, action);
    expect(state).toEqual(action.payload);
  });
});
