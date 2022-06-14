import LetterProofingButton from "components/LetterProofing";
import { shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";
import { ninStateFromNinList } from "reducers/Identities";
import letterProofingSlice from "../reducers/LetterProofing";
import { dashboardTestState, setupComponent } from "./helperFunctions/DashboardTestApp";

describe("LetterProofing Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <LetterProofingButton disabled />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("Letter Proofing, with disabled props", () => {
  const props = {
    disabled: true,
  };

  function getWrapper() {
    return setupComponent({
      component: <LetterProofingButton {...props} />,
      overrides: {
        letter_proofing: {
          letter_expired: true,
        },
        identities: ninStateFromNinList([{ number: "20001010", verified: false, primary: true }]),
      },
    });
  }
  it("Renders, button disabled ", () => {
    const wrapper = getWrapper();
    expect(wrapper.find(LetterProofingButton).prop("disabled"));
  });
});

describe("LetterProofing component, without id number", () => {
  function getWrapper() {
    return setupComponent({
      component: <LetterProofingButton disabled />,
      overrides: {
        letter_proofing: {
          letter_sent: undefined,
          letter_expired: false,
        },
        identities: ninStateFromNinList([]),
      },
    });
  }
  it("Renders button text, add ID number to get letter", () => {
    const wrapper = getWrapper();
    const description = wrapper.find("div.description");
    expect(description.exists()).toEqual(true);
    expect(description.text()).toContain("ID number");
  });
});

describe("LetterProofing component, letter has been sent", () => {
  function getWrapper() {
    return setupComponent({
      component: <LetterProofingButton disabled={false} />,
      overrides: {
        letter_proofing: {
          letter_sent: "2021-11-23T13:37:15.799000+00:00",
          letter_expires: "2021-12-07T19:59:59.799000+00:00",
        },
        identities: ninStateFromNinList([{ number: "19881212", verified: false, primary: true }]),
      },
    });
  }
  it("Renders button text, the letter was sent", () => {
    const wrapper = getWrapper();
    const description = wrapper.find("div.description");
    const letterSent = description.at(0);
    const letterSentDate = wrapper.find("#letter_sent_date");
    const letterValid = description.at(1);
    const letterValidDate = description.find("#letter_expires_date");

    expect(description.exists()).toEqual(true);
    expect(letterSent.exists()).toEqual(true);
    expect(letterSent.text()).toContain("The letter was sent");
    expect(letterSentDate.text()).toEqual("2021-11-23");
    expect(letterValid.exists()).toEqual(true);
    expect(letterValid.text()).toContain("The letter is valid to");
    expect(letterValidDate.text()).toEqual("2021-12-07");
  });
});

describe("LetterProofing component, letter has been sent", () => {
  function getWrapper() {
    return setupComponent({
      component: <LetterProofingButton disabled={false} />,
      overrides: {
        letter_proofing: {
          letter_sent: "2021-11-23T13:37:15.799000+00:00",
          letter_expires: "2021-12-07T19:59:59.799000+00:00",
          letter_expired: true,
        },
        identities: ninStateFromNinList([{ number: "19881212", verified: false, primary: true }]),
      },
    });
  }
  it("Renders button text, the code has expired", () => {
    const wrapper = getWrapper();
    const description = wrapper.find("div.description");
    const codeExpired = description.at(0);
    const orderNewLetter = description.at(1);
    const letterValidDate = description.find("#letter_expires_date");

    expect(description.exists()).toEqual(true);

    expect(codeExpired.exists()).toEqual(true);
    expect(codeExpired.text()).toContain("expired");
    expect(orderNewLetter.exists()).toEqual(true);
    expect(orderNewLetter.text()).toContain("order a new code");
    expect(letterValidDate.text()).toEqual("2021-12-07");
  });
});

describe("LetterProofing Component", () => {
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <LetterProofingButton disabled={false} />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });
});

describe("LetterProofing Slice", () => {
  it("fetchLetterProofingState is fulfilled", () => {
    const action = {
      type: "letterProofing/fetchLetterProofingState/fulfilled",
      payload: {
        letter_expires_in_days: 12,
        letter_sent_days_ago: 2,
        letter_sent: "2021-11-23T17:37:15.799000+00:00",
        letter_expires: "2021-12-07T23:59:59.799000+00:00",
        letter_expired: true,
      },
    };
    const state = letterProofingSlice.reducer(dashboardTestState.letter_proofing, action);
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
    const state = letterProofingSlice.reducer(dashboardTestState.letter_proofing, action);
    expect(state).toEqual(action.payload);
  });
  it("confirmLetterCode is fulfilled", () => {
    const action = {
      type: "letterProofing/confirmLetterCode/fulfilled",
      payload: {
        message: "letter.verification_success",
      },
    };
    const state = letterProofingSlice.reducer(dashboardTestState.letter_proofing, action);
    expect(state).toEqual({
      letter_sent: undefined,
      letter_expires: undefined,
      letter_expired: undefined,
      letter_expires_in_days: undefined,
      letter_sent_days_ago: undefined,
    });
  });
});
