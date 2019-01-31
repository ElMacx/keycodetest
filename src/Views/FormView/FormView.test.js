import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { QuestionView } from "../QuestionView/QuestionView";
import { OutcomeView } from "../OutcomeView/OutcomeView";
import { RadioButton } from "../../Components/RadioButton/RadioButton";

configure({ adapter: new Adapter() });

describe("FormView", () => {
  it("HeaderBar should be defined", () => {
    expect(HeaderBar).toBeDefined();
  });
  it("QuestionView should be defined", () => {
    expect(QuestionView).toBeDefined();
  });
  it("OutcomeView should be defined", () => {
    expect(OutcomeView).toBeDefined();
  });
});
