import * as actions from "actions/PersonalData";
import { LadokData } from "apis/eduidLadok";
import { storeCsrfToken } from "commonConfig";
import expect from "expect";
import { appLoaded } from "login/components/App/App_actions";
import emailsSlice from "reducers/Emails";
import ladokSlice from "reducers/Ladok";
import ninsSlice from "reducers/Nins";
import personalDataSlice from "reducers/PersonalData";
import phonesSlice from "reducers/Phones";
import { call, put } from "redux-saga/effects";
import { fetchAllPersonalData, requestAllPersonalData } from "../sagas/PersonalData";

const personalDataReducer = personalDataSlice.reducer;

describe("Personal Data Actions", () => {
  it("Should get the data user for personal data", () => {
    expect(actions.getAllUserdata().type).toEqual("GET_ALL_USERDATA");
  });

  it("Should fail when getting the data user for personal data", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_ALL_USERDATA_FAIL.type,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getAllUserdataFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    given_name: "John",
    surname: "Smith",
    display_name: "John",
    language: "en",
    eppn: "dummy-eppn",
  };

  it("Receives a GET_ALL_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.getAllUserdata.type,
      })
    ).toEqual({
      display_name: "John",
      eppn: "dummy-eppn",
      given_name: "John",
      language: "en",
      surname: "Smith",
    });
  });

  it("Receives a GET_ALL_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.GET_ALL_USERDATA_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      given_name: "John",
      surname: "Smith",
      display_name: "John",
      language: "en",
      eppn: "dummy-eppn",

      message: "Bad error",
    });
  });

  it("Receives a POST_USERDATA_FAIL action", () => {
    expect(personalDataReducer(mockState, actions.postUserdataFail("Bad error"))).toEqual({
      display_name: "John",
      eppn: "dummy-eppn",
      given_name: "John",
      language: "en",
      message: "Bad error",
      surname: "Smith",
    });
  });
});

describe("Async component", () => {
  it("Sagas requestAllPersonalData", () => {
    const generator = requestAllPersonalData();

    // The saga yields this getAllUserdata action. Seems like a NO-OP, nothing consumes it.
    let next = generator.next();
    expect(next.value).toEqual(put(actions.getAllUserdata()));

    const fakeState = {
      config: {
        personal_data_url: "http://localhost/services/personal-data/user",
      },
    };
    next = generator.next();

    // The saga selects the state, provide fakeState as response
    next = generator.next(fakeState as unknown as any);

    // The saga calls fetchAllPersonalData
    expect(next.value).toEqual(call(fetchAllPersonalData, fakeState.config));

    const pd_ladok: LadokData = {
      external_id: "foo",
      university: { ladok_name: "TEST", name: { en: "eng", sv: "sve" } },
    };
    const response = {
      type: actions.GET_ALL_USERDATA_SUCCESS,
      payload: {
        csrf_token: "csrf-token",
        given_name: "",
        surname: "",
        display_name: "",
        language: "",
        eppn: "",
        nins: [],
        emails: [],
        phones: [],
        ladok: pd_ladok,
      },
    };

    // Pretend we got this rather empty data in 'response' back from the backend
    next = generator.next(response as unknown as any);

    // The saga updates the CSRF in the state with the one from the response
    const value = next.value as unknown as any;
    expect(value.PUT.action.type).toEqual(storeCsrfToken.type);

    // The saga sends the nins on to the nins reducer
    const action2 = ninsSlice.actions.setNins([]);
    next = generator.next(action2 as unknown as any);
    expect(next.value).toEqual(put(action2));

    // The saga sends the emails on to the nins reducer
    const action3 = emailsSlice.actions.setEmails([]);
    next = generator.next(action3 as unknown as any);
    expect(next.value).toEqual(put(action3));

    // The saga sends the mobiles on to the mobiles reducer
    const action4 = phonesSlice.actions.setPhones([]);
    next = generator.next(action4 as unknown as any);
    expect(next.value).toEqual(put(action4));

    // The saga sends the personal data on to the pdata reducer
    const action5 = {
      type: personalDataSlice.actions.updatePersonalData.type,
      payload: {
        given_name: "",
        surname: "",
        display_name: "",
        language: "",
        eppn: "",
      },
    };
    next = generator.next();
    expect(next.value).toEqual(put(action5 as unknown as any));

    const action6 = {
      type: "GET_PERSONAL_DATA_USER_SUCCESS",
    };

    // The saga passes Ladok linking data on to the ladok reducer
    next = generator.next();
    expect(next.value).toEqual(put(ladokSlice.actions.updateLadok(pd_ladok)));

    next = generator.next();
    expect(next.value).toEqual(put(action6 as unknown as any));

    // The saga informs whomever it concerns that it is done
    next = generator.next();
    expect(next.value).toEqual(put(appLoaded()));

    expect(generator.next().done).toEqual(true);
  });
});
