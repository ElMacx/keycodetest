import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { NotFoundView } from "../NotFoundView/NotFoundView";
import { RadioButton } from "../../Components/RadioButton/RadioButton";

configure({ adapter: new Adapter() });

describe('NotFoundView', () => {
  it("NotFoundView should be defined", () => {
    expect(NotFoundView).toBeDefined();
  });
  it("Retry button should be displayed", () => {
    const wrapper = shallow(<NotFoundView />);
    expect(wrapper.find("button")).toBeDefined();
  });
  it("Oops went wrong text should be displayed", () => {
    const wrapper = shallow(<NotFoundView />);
    expect(wrapper.text()).toContain('Oops, something went wrong...');
  });
  it("Retry button should call the right method", () => {
    const mockCallBack = jest.fn()
    const wrapper = shallow(<NotFoundView retryClickEvent={mockCallBack} />);
    wrapper.find('button').simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });
})
