const mock = require("jest-mock");
import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import PersonalDataContainer from "containers/PersonalData";
import * as actions from "actions/PersonalData";
import * as emailActions from "actions/Emails";
import * as phoneActions from "actions/Mobile";
import * as ninActions from "actions/Nins";
import fetchMock from "fetch-mock";
import personalDataReducer from "reducers/PersonalData";

import {
  requestAllPersonalData,
  // savePersonalData,
  fetchAllPersonalData,
  // sendPersonalData
} from "../sagas/PersonalData";
import { put, call } from "redux-saga/effects";

import { Provider } from "react-intl-redux";
import { addLocaleData } from "react-intl";

const messages = require("../login/translation/messageIndex");
addLocaleData("react-intl/locale-data/en");

describe("Personal Data Actions", () => {
  it("Should get the data user for personal data", () => {
    const expectedAction = {
      type: actions.GET_ALL_USERDATA
    };
    expect(actions.getAllUserdata()).toEqual(expectedAction);
  });

  it("Should fail when getting the data user for personal data", () => {
    const err = "Bad error";
    const expectedAction = {
      type: actions.GET_ALL_USERDATA_FAIL,
      error: true,
      payload: {
        message: err
      }
    };
    expect(actions.getAllUserdataFail(err)).toEqual(expectedAction);
  });

  it("shouldn't update personal data user", () => {
    const data = {
      name: "Pablo"
    };
    const data_error = {
      name: "Pablo",
      language: "en"
    };
    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data_error
    };
    expect(actions.changeUserdata(data)).not.toEqual(expectedAction);
  });

  it("should update personal data user", () => {
    const data = {
      name: "Pablo",
      language: "en"
    };

    const expectedAction = {
      type: actions.CHANGE_USERDATA,
      payload: data
    };
    expect(actions.changeUserdata(data)).toEqual(expectedAction);
  });

  it("Should post the data for personal data", () => {
    const expectedAction = {
      type: actions.POST_USERDATA
    };
    expect(actions.postUserdata()).toEqual(expectedAction);
  });

  it("Should fail when post the data for personal data", () => {
    const err = "Bad error";

    const expectedAction = {
      type: actions.POST_USERDATA_FAIL,
      error: true,
      payload: {
        message: err
      }
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
      eppn: "dummy-eppn"
    }
  };

  it("Receives a GET_ALL_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.GET_ALL_USERDATA
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn"
      }
    });
  });

  it("Receives a GET_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(mockState, {
        payload: { surname: "Surname" },
        type: actions.GET_USERDATA_SUCCESS
      })
    ).toEqual({
      data: {
        surname: "Surname"
      }
    });
  });

  it("Receives a GET_ALL_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.GET_ALL_USERDATA_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn"
      },
      message: "Bad error"
    });
  });

  it("Receives a CHANGE_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.CHANGE_USERDATA,
        payload: {
          given_name: "Jonna",
          display_name: "Jonna"
        }
      })
    ).toEqual({
      data: {
        given_name: "Jonna",
        eppn: "dummy-eppn",
        display_name: "Jonna"
      }
    });
  });

  it("Receives a POST_USERDATA action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.POST_USERDATA
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn"
      }
    });
  });

  it("Receives a POST_USERDATA_SUCCESS action", () => {
    expect(
      personalDataReducer(mockState, {
        payload: { surname: "Surname" },
        type: actions.POST_USERDATA_SUCCESS
      })
    ).toEqual({
      data: {
        surname: "Surname",
        eppn: "dummy-eppn"
      }
    });
  });

  it("Receives a POST_USERDATA_FAIL action", () => {
    expect(
      personalDataReducer(mockState, {
        type: actions.POST_USERDATA_FAIL,
        payload: {
          message: "Bad error"
        }
      })
    ).toEqual({
      data: {
        given_name: "John",
        surname: "Smith",
        display_name: "John",
        language: "en",
        eppn: "dummy-eppn"
      },
      message: "Bad error"
    });
  });
});

const fakeStore = state => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...state })
});

const fakeState = {
  personal_data: {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: ""
    }
  },
  config: {
    csrf_token: "",
    is_configured: true,
    personal_data_url: "http://localhost/services/personal-data/user"
  },
  intl: {
    locale: "en",
    messagers: messages
  },
  form: {
    personal_data: {
      values: {
        given_name: "",
        surname: "",
        display_name: "",
        language: ""
      }
    }
  }
};

function setupComponent(store) {
  const props = {
    data: {
      given_name: "",
      surname: "",
      display_name: "",
      language: "",
      eppn: ""
    },
    handleSave: mock.fn(),
    handleChange: mock.fn()
  };

  const wrapper = mount(
    <Provider store={store}>
      <PersonalDataContainer {...props} />
    </Provider>
  );
  return {
    props,
    wrapper
  };
}

describe("Async component", () => {
  it("Sagas requestAllPersonalData", () => {
    const generator = requestAllPersonalData();

    let next = generator.next();
    expect(next.value).toEqual(put(actions.getAllUserdata()));

    const config = {
      personal_data_url: "http://localhost/services/personal-data/user"
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
        phones: []
      }
    };
    next = generator.next(action);
    expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");

    action = {
      type: ninActions.GET_NINS_SUCCESS,
      payload: {
        nins: []
      }
    };
    next = generator.next(action);
    expect(next.value).toEqual(put(action));

    action = {
      type: emailActions.GET_EMAILS_SUCCESS,
      payload: {
        emails: []
      }
    };
    next = generator.next(action);
    expect(next.value).toEqual(put(action));

    action = {
      type: phoneActions.GET_MOBILES_SUCCESS,
      payload: {
        phones: []
      }
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
        eppn: ""
      }
    };
    next = generator.next();
    expect(next.value).toEqual(put(action));
  });

  // it("Sagas savePersonalData", () => {
  //   const generator = savePersonalData();

  //   let next = generator.next();

  //   // const config = next.value;
  //   next = generator.next(fakeState);

  //   const config = fakeState.config;
  //   const data = {
  //     given_name: "",
  //     surname: "",
  //     display_name: "",
  //     language: "",
  //     csrf_token: ""
  //   };

  //   // expect(data).toEqual(select(fakeState => fakeState.config));

  //   generator.next(data);
  //   generator.next();
  //   next = generator.next();

  //   expect(next.value).toEqual(call(sendPersonalData, config, data));

  //   const action = {
  //     type: actions.POST_USERDATA_SUCCESS,
  //     payload: {
  //       csrf_token: "csrf-token",
  //       given_name: "",
  //       surname: "",
  //       display_name: "",
  //       language: "",
  //       eppn: ""
  //     }
  //   };
  //   next = generator.next(action);
  //   expect(next.value.PUT.action.type).toEqual("NEW_CSRF_TOKEN");
  //   generator.next();
  //   delete action.payload.csrf_token;
  //   generator.next();
  //   next = generator.next();
  //   expect(next.value).toEqual(put(action));
  // });
});

describe("PersonalData Component", () => {
  it("Renders", () => {
    const store = fakeStore(fakeState),
      { wrapper } = setupComponent(store),
      form = wrapper.find("form"),
      fieldset = wrapper.find("fieldset"),
      language = wrapper.find("#language"),
      surname = wrapper.find("#surname"),
      given_name = wrapper.find("#given_name"),
      display_name = wrapper.find("#display_name"),
      button = wrapper.find("EduIDButton#personal-data-button");

    expect(form.contains(fieldset.get(0))).toBeTruthy();
    expect(fieldset.hasClass("tabpane")).toBeTruthy();
    expect(fieldset.contains(language.get(0))).toBeTruthy();
    expect(fieldset.contains(surname.get(0))).toBeTruthy();
    expect(fieldset.contains(given_name.get(0))).toBeTruthy();
    expect(fieldset.contains(display_name.get(0))).toBeTruthy();

    expect(form.props()).toMatchObject({ role: "form" });
    expect(fieldset.props()).toMatchObject({ id: "personal-data-form" });

    const numCalls = store.dispatch.mock.calls.length;
    const fakeEvent = {
      preventDefault: () => {}
    };
    button.props().onClick(fakeEvent);
    expect(store.dispatch.mock.calls.length).toEqual(numCalls + 1);
  });
});

describe("PersonalData Container", () => {
  let given_name,
    fulldom,
    surname,
    display_name,
    language,
    eppn,
    mockProps,
    wrapper,
    dispatch;

  beforeEach(() => {
    const store = fakeStore(fakeState);

    mockProps = {
      data: {
        given_name: "Pablo",
        surname: "Iglesias",
        display_name: "Pablo",
        language: "en",
        eppn: "dummy-eppn"
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <PersonalDataContainer {...mockProps} />
      </Provider>
    );
    fulldom = wrapper.find(PersonalDataContainer);
    given_name = fulldom.props().data.given_name;
    surname = fulldom.props().data.surname;
    display_name = fulldom.props().data
      .display_name;
    language = fulldom.props().data.language;
    eppn = fulldom.props().data.eppn;
    dispatch = store.dispatch;
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Renders", () => {
    expect(language).toEqual("en");
    expect(given_name).toEqual("Pablo");
    expect(surname).toEqual("Iglesias");
    expect(display_name).toEqual("Pablo");
    expect(eppn).toEqual("dummy-eppn");
  });

  it("Clicks", () => {
    const mockEvent = {
      preventDefault: () => {}
    };

    fetchMock.post("http://localhost/services/personal-data/user", {
      type: actions.POST_USERDATA_SUCCESS
    });
    const numCalls = dispatch.mock.calls.length;
    wrapper
      .find("EduIDButton#personal-data-button")
      .props()
      .onClick(mockEvent);
    expect(dispatch.mock.calls.length).toEqual(numCalls + 1);
  });
});
