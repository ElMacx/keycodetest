import React from "react";
import ReactDOM from "react-dom";
import { RadioButton } from "./RadioButton";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe('RadioButton', () => {
  it("Radio button should be defined", () => {
    expect(RadioButton).toBeDefined();
  });
  it("Radio button click should call the click method", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <RadioButton
          ans={ {id: "heartburn_lost_weight_yes", label: "Yes", score: 25} }
          handleOptionChange={mockCallBack}
      />
    );
    wrapper
      .find('input')
      .simulate('change');
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("Radio button click should change the state to selected", () => {
    let value = false
    const mockCallBack = () => {
      value = true;
    };
    const wrapper = shallow(
      <RadioButton
          ans={ {id: "heartburn_lost_weight_yes", label: "Yes", score: 25} }
          handleOptionChange={mockCallBack}
          isSelected={value}
      />
    );
    wrapper
      .find('input')
      .simulate('change');
    expect(value).toBe(true);
  });
})
