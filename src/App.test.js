import React from "react";
import App from "./App";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { FormView } from "./Views/FormView/FormView";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("should be defined", () => {
    expect(FormView).toBeDefined();
  });
});
