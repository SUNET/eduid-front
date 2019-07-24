import React from "react";
import expect from "expect";
import { shallow } from "enzyme";
import AccountId from "components/AccountId";
import { IntlProvider } from "react-intl";


// my job is to: control if <NinForm />  or <NinDisplay> are shown based on the prenesce of a nin (verify-identity)