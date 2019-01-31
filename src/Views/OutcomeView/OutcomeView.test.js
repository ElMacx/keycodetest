import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { CustomButton } from "../../Components/CustomButton/CustomButton";
import { OutcomeView } from "../OutcomeView/OutcomeView";
import { RadioButton } from "../../Components/RadioButton/RadioButton";

configure({ adapter: new Adapter() });

describe('OutcomeView', () => {
  it("Book an apointment should be defined", () => {
    const wrapper = shallow(<OutcomeView finalOutcome={{}} />);
    expect(wrapper.find("button")).toBeDefined();
  });
  it("Book an apointment should call the right method", () => {
    const mockCallBack = jest.fn()
    const wrapper = shallow(<OutcomeView finalOutcome={{}} restartProcess={mockCallBack}/>);
    wrapper.find("#restart-text").simulate('click');
    expect(mockCallBack).toHaveBeenCalled();
  });
})
