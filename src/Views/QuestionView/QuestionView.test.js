import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { QuestionView } from "../QuestionView/QuestionView";
import { RadioButton } from "../../Components/RadioButton/RadioButton";

configure({ adapter: new Adapter() });

describe('QuestionView', () => {
  it("Next button should be rendered", () => {
    const wrapper = shallow(
      <QuestionView currentQuestion={{ question_text: "Toto", answers: [] }} />
    );
    expect(wrapper.find("#next-button")).toBeDefined();
  });
  it("Next button should be disabled", () => {
    const wrapper = shallow(
      <QuestionView currentQuestion={{ question_text: "Toto", answers: [] }} />
    );
    expect(wrapper.find("#next-button").props().isDisabled).toBe(true);
  });
  it("Next button should not be disabled if there is a selected answer", () => {
    const wrapper = shallow(
      <QuestionView
        currentQuestion={{ question_text: "Toto", answers: [] }}
        currentAnswer={{}}
      />
    );
    expect(wrapper.find("#next-button").props().isDisabled).toBe(false);
  });
  it("Next button click should call function", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <QuestionView
        currentQuestion={{ question_text: "Toto", answers: [] }}
        currentAnswer={{}}
        goToNextQuestion={mockCallBack}
      />
    );
    wrapper
      .find(CustomButton)
      .props()
      .clickEvent();
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("Radio button click should call the click method", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(
      <QuestionView
        currentQuestion={{
          question_text: "Toto",
          answers: [
            { id: "heartburn_lost_weight_yes", label: "Yes", score: 25 }
          ]
        }}
        handleOptionChange={mockCallBack}
      />
    );
    wrapper
      .find(RadioButton)
      .props()
      .handleOptionChange();
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("Radio button click should change its selected props", () => {
    const mockCallBack = jest.fn()
    const wrapper = shallow(
      <QuestionView
        currentQuestion={{
          question_text: "Toto",
          answers: [
            { id: "heartburn_lost_weight_yes", label: "Yes", score: 25 }
          ]
        }}
        currentAnswer={{ id: "heartburn_lost_weight_yes", label: "Yes", score: 25 }}
        handleOptionChange={mockCallBack}
      />
    );
    wrapper
      .find(RadioButton)
      .props()
      .handleOptionChange();
    expect(wrapper.find(RadioButton).props().isSelected).toBe(true);
  });
})
