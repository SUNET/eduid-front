import { Captcha } from "components/Captcha";
import { shallow } from "enzyme";
import { rest } from "msw";
import { IntlProvider } from "react-intl";
import { mswServer } from "setupTests";
import { setupComponent } from "./helperFunctions/SignupTestApp";

function handleCaptchaCancel() {}
function handleCaptchaCompleted(response: string) {}
function toggleCaptcha() {}

const args = { handleCaptchaCancel, handleCaptchaCompleted, toggleCaptcha };

describe("Captcha Component", () => {
  beforeEach(() => {
    mswServer.use(
      rest.get("https://www.google.com/recaptcha/api.js", (req, res, ctx) => {
        return res(ctx.body("dummy-script"));
      })
    );
  });
  it("The component does not render 'false' or 'null'", () => {
    const wrapper = shallow(
      <IntlProvider locale="en">
        <Captcha {...args} />
      </IntlProvider>
    );
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it("The captcha <div> element renders", () => {
    const fullWrapper = setupComponent({
      component: <Captcha {...args} />,
    });
    const captcha = fullWrapper.find("#captcha");
    expect(captcha.exists()).toEqual(true);
  });

  it("Renders the CANCEL button", () => {
    const fullWrapper = setupComponent({
      component: <Captcha {...args} />,
    });
    const button = fullWrapper.find("EduIDButton");
    expect(button.exists()).toEqual(true);
    expect(button.length).toEqual(1);
  });
});
