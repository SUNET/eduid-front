const mock = require("jest-mock");
import PhonesComponent from "components/Phones";
import { shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";
import phonesSlice from "reducers/Phones";
import DataTable from "../login/components/DataTable/DataTable";
import { dashboardTestState, setupComponent } from "./helperFunctions/DashboardTestApp";

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
              number: "+46070000001",
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
