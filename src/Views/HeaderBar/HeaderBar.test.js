import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { HeaderBar } from "../HeaderBar/HeaderBar";

configure({ adapter: new Adapter() });

describe('HeaderBar', () => {
  const wrapper = shallow(
    <HeaderBar
      progressBarPercentage={10}
      questionQueue={[]}
      finalOutcome={null}
    />
  );
  it("should find proper text", () => {
    expect(wrapper.find("#app-title").text()).toBe("Heartburn Checker");
  });
  it("previous button should be rendered", () => {
    expect(wrapper.find("#previous-button")).toBeDefined();
  });
  it("previous button should appear", () => {
    const wrapper = shallow(
      <HeaderBar
        progressBarPercentage={10}
        questionQueue={[{}]}
        finalOutcome={null}
      />
    );
    expect(wrapper.find("button").length).toBe(1);
  });
})
