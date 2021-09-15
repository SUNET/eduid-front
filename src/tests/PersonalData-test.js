const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import PersonalDataContainer from "../login/components/PersonalData/PersonalDataParent";
import * as actions from "actions/PersonalData";
import * as emailActions from "actions/Emails";
import * as phoneActions from "actions/Mobile";
import * as ninActions from "actions/Nins";
import fetchMock from "fetch-mock";
import personalDataReducer from "reducers/PersonalData";

import {
  requestAllPersonalData,
  fetchAllPersonalData,
} from "../sagas/PersonalData";
import { put, call } from "redux-saga/effects";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("Personal Data Actions", () => {
  it("Should get the data user for personal data", () => {
    const expectedAction = {
      type: actions.GET_ALL_USERDATA,
    };
    expect(actions.getAllUserdata()).toEqual(expectedAction);
  });

  it("Should fail when getting the data user for personal data", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_ALL_USERDATA_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.getAllUserdataFail(err)).toEqual(expectedAction);
  });

  it("shouldn't update personal data user", () => {
    const data = {
      name: "Pablo",
    };
    const data_error = {
      name: "Pablo",
      language: "en",
    };
    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data_error,
    };
    expect(actions.changeUserdata(data)).not.toEqual(expectedAction);
  });

  it("should update personal data user", () => {
    const data = {
      name: "Pablo",
      language: "en",
    };

    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data,
    };
    expect(actions.changeUserdata(data)).toEqual(expectedAction);
  });

  it("Should post the data for personal data", () => {
    const expectedAction = {
      type: actions.POST_USERDATA,
    };
    expect(actions.postUserdata()).toEqual(expectedAction);
  });

  it("Should fail when post the data for personal data", () => {
    const err = "Bad error";

    const expectedAction = {
      type: actions.POST_USERDATA_FAIL,
      error: true,
      payload: {
        message: err,
      },
    };
    expect(actions.postUserdataFail(err)).toEqual(expectedAction);
  });
});

describe("Reducers", () => {
  const mockState = {
    data: {
      given_name: "John",
      surname: "Smith",
      display_name: "John",
      language: "en",
      eppn: "dummy-eppn",
    },
  };

  it("Receives a GET_ALL_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.GET_ALL_USERDATA,
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn",
      },
    });
  });

  it("Receives a GET_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(mockState, {
        payload: { surname: "Surname" },
        type: actions.GET_USERDATA_SUCCESS,
      })
    ).toEqual({
      data: {
        surname: "Surname",
      },
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
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn",
      },
      message: "Bad error",
    });
  });

  it("Receives a CHANGE_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.CHANGE_USERDATA,
        payload: {
          given_name: "Jonna",
          display_name: "Jonna",
        },
      })
    ).toEqual({
      data: {
        given_name: "Jonna",
        eppn: "dummy-eppn",
        display_name: "Jonna",
      },
    });
  });

  it("Receives a POST_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.POST_USERDATA,
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn",
      },
    });
  });

  it("Receives a POST_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(mockState, {
        payload: { surname: "Surname" },
        type: actions.POST_USERDATA_SUCCESS,
      })
    ).toEqual({
      data: {
        surname: "Surname",
        eppn: "dummy-eppn",
      },
    });
  });

  it("Receives a POST_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.POST_USERDATA_FAIL,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn",
      },
      message: "Bad error",
    });
  });
});

const fakeStore = (state) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state }),
});

const fakeState = {
  personal_data: {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: "",
    },
  },
  config: {
    csrf_token: "",
    is_configured: true,
    personal_data_url: "http://localhost/services/personal-data/user",
  },
  intl: {
    locale: "en",
    messagers: messages,
  },
  form: {
    personal_data: {
      values: {
        given_name: "",
        surname: "",
        display_name: "",
        language: "",
      },
    },
  },
};

function setupComponent(store) {
  const props = {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: "",
    },
    handleSave: mock.fn(),
    handleChange: mock.fn(),
  };

  const wrapper = mount(
    <Provider store={store}>
      <PersonalDataContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper,
  };
}

describe("Async component", () => {
  it("Sagas requestAllPersonalData", () => {
    const generator = requestAllPersonalData();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getAllUserdata()));

    const config = {
      personal_data_url: "http://localhost/services/personal-data/user",
    };
    next = generator.next();

    next = generator.next(config);
    expect(next.value).toEqual(call(fetchAllPersonalData, config));

    let action = {
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
      },
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");

    action = {
      type: ninActions.GET_NINS_SUCCESS,
      payload: {
        nins: [],
      },
    };
    next = generator.next(action);
    expect(next.value).toEqual(put(action));

    action = {
      type: emailActions.GET_EMAILS_SUCCESS,
      payload: {
        emails: [],
      },
    };
    next = generator.next(action);
    expect(next.value).toEqual(put(action));

    action = {
      type: phoneActions.GET_MOBILES_SUCCESS,
      payload: {
        phones: [],
      },
    };
    next = generator.next(action);
    expect(next.value).toEqual(put(action));

    action = {
      type: actions.GET_USERDATA_SUCCESS,
      payload: {
        given_name: "",
        surname: "",
        display_name: "",
        language: "",
        eppn: "",
      },
    };
    next = generator.next();
    expect(next.value).toEqual(put(action));
  });
});
