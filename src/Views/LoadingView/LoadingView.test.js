import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { LoadingView } from "../LoadingView/LoadingView";
import { getLabel } from "../../translationFile";

configure({ adapter: new Adapter() });

describe('LoadingView', () => {
  it("LoadingView should be defined", () => {
    expect(LoadingView).toBeDefined();
  });
  it("Loading text should be displayed", () => {
    const wrapper = shallow(<LoadingView />);
    expect(wrapper.text()).toContain(getLabel('label.loading'));
  });
})
