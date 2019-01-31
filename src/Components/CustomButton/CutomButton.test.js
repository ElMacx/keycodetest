import React from "react";
import ReactDOM from "react-dom";
import { CustomButton } from "./CustomButton";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe('CustomButton', () => {
  it("Button should be defined", () => {
    expect(CustomButton).toBeDefined();
  });
  it("Button should be clickable", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <CustomButton
        isDisabled={false}
        buttonText="Next"
        clickEvent={mockCallBack}
      />
    );
    wrapper
      .find('button')
      .simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("Button should not be clickable", () => {
    const wrapper = shallow(
      <CustomButton
        isDisabled={true}
        buttonText="Next"
      />
    );
    expect(wrapper.find('button').props().disabled).toBe(true);
  });
  it("Correct text should be displayed", () => {
    const wrapper = shallow(
      <CustomButton
        buttonText="Next"/>
    );
    expect(wrapper.find('button').text()).toContain('Next');
  });
})
