const mock = require("jest-mock");
const messages = require("../login/translation/messageIndex");
import React from "react";
import expect from "expect";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import GroupsParent from "../login/components/GroupManagement/Groups/GroupsParent";
import CreateGroup from "../login/components/GroupManagement/Groups/CreateGroup";
import * as getAllGroupDataActions from "../login/redux/actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../login/redux/actions/createGroupActions";
import groupsReducer from "../login/redux/reducers/groupsReducer";

const baseState = {
  groups: {
    createGroup: null,
    data: [],
    loading: false,
    message: "",
    payload: "",
  },
  invites: {
    message: "",
    invitesFromMe: [],
    invitesToMe: [],
  },
  form: [],
  intl: {
    locale: "en",
    messages: messages,
  },
};

const fakeStore = (fakeState) => ({
  default: () => {},
  dispatch: mock.fn(),
  subscribe: mock.fn(),
  getState: () => ({ ...fakeState }),
});

function getFakeState(newState) {
  if (newState === undefined) {
    newState = {};
  }
  return Object.assign(baseState, newState);
}

describe("Actions trigger the correct types:", () => {
  it("getAllGroupsDataFail() > GET_GROUP_MANAGEMENT_ALL_DATA_FAIL", () => {
    const err = "Bad error";
    const expectedAction = {
      type: getAllGroupDataActions.GET_GROUP_MANAGEMENT_ALL_DATA_FAIL,
      error: true,
      payload: {
        message: "Bad error",
      },
    };
    expect(getAllGroupDataActions.getAllGroupsDataFail(err)).toEqual(expectedAction);
  });

  it("openCreateGroup() > OPEN_CREATE_GROUP_PANEL", () => {
    const expectedAction = {
      type: createGroupActions.OPEN_CREATE_GROUP_PANEL,
    };
    expect(createGroupActions.openCreateGroup()).toEqual(expectedAction);
  });
});

describe("Reducer updates redux state correclty:", () => {
  const fakeState = getFakeState();
  const groupsState = fakeState.groups;
  it("groupsReducer > GET_GROUP_MANAGEMENT_ALL_DATA_FAIL", () => {
    expect(
      groupsReducer(groupsState, {
        type: getAllGroupDataActions.GET_GROUP_MANAGEMENT_ALL_DATA_FAIL,
        error: true,
        payload: {
          message: "Bad error",
        },
      })
    ).toEqual({
      ...groupsState,
    });
  });

  it("groupsReducer > OPEN_CREATE_GROUP_PANEL", () => {
    expect(
      groupsReducer(groupsState, {
        type: createGroupActions.OPEN_CREATE_GROUP_PANEL,
      })
    ).toEqual({
      ...groupsState,
      createGroup: true,
    });
  });
});

describe("<GroupManagement/> correctly renders:", () => {
  const fakeState = getFakeState({
    data: {
      csrf_token: "",
      groups: [],
      incoming: [],
      outgoing: [],
      user_identifier: "",
    },
    form: {
      groupName: {},
    },
  });

  const props = {
    hasNoGroups: "",
  };

  function setupComponent() {
    const wrapper = mount(
      <ReduxIntlProvider store={fakeStore(fakeState)}>
        <MemoryRouter>
          <GroupManagement {...props} />
        </MemoryRouter>
      </ReduxIntlProvider>
    );
    return {
      wrapper,
      props,
    };
  }

  it("<article> the outermost html tag", () => {
    const { wrapper } = setupComponent();
    const htmlTag = wrapper.find("article");
    expect(htmlTag.exists()).toEqual(true);
  });

  it("state.groups.createGroup: false => 'create group' <button>", () => {
    const state = { ...fakeState };
    state.groups.createGroup = false;
    const { wrapper } = setupComponent();
    const createGroupButton = wrapper.find("button.create-group");
    expect(createGroupButton.exists()).toEqual(true);
  });

  it("state.groups.createGroup: true => No 'create group' <button>", () => {
    const state = { ...fakeState };
    state.groups.createGroup = true;
    const { wrapper } = setupComponent();
    const createGroupButton = wrapper.find("button.create-group");
    expect(createGroupButton.exists()).toEqual(false);
  });

  it("hasNoGroups: true => <CreateGroup> + NO <GroupsParent>", () => {
    const state = { ...fakeState };
    state.groups.data = [];
    state.groups.createGroup = false;
    props.hasNoGroups = true;
    const { wrapper } = setupComponent();
    const createGroup = wrapper.find(CreateGroup);
    expect(createGroup.exists()).toEqual(true);

    const groupsParent = wrapper.find(GroupsParent);
    expect(groupsParent.exists()).toEqual(false);
  });

  it("hasNoGroups: false => <GroupsParent> + NO <CreateGroup>", () => {
    const state = { ...fakeState };
    state.groups.data = [
      { display_name: "Group 1", identifier: "1" },
      { display_name: "Group 2", identifier: "2" },
      { display_name: "Group 3", identifier: "3" },
    ];
    state.groups.createGroup = false;
    props.hasNoGroups = false;
    const { wrapper } = setupComponent();
    const createGroup = wrapper.find(CreateGroup);
    expect(createGroup.exists()).toEqual(false);

    const groupsParent = wrapper.find(GroupsParent);
    expect(groupsParent.exists()).toEqual(true);
  });
});
