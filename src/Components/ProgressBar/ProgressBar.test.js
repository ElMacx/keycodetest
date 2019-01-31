import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { ProgressBar } from "./ProgressBar";

configure({ adapter: new Adapter() });

describe('ProgressBar', () => {
  it('ProgressBar should render', () => {
    expect(ProgressBar).toBeDefined();
  });
});
