import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import InputGroup from "./InputGroup";

describe("InputGroup", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<InputGroup name="test" onChange={() => {}} value="value" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders input with default type text", () => {
    const component = shallow(<InputGroup name="test" onChange={() => {}} value="value" />);
    expect(component.find("input").prop("type")).toBe("text");
  });

  test("renders input with given value", () => {
    const component = shallow(<InputGroup name="test" onChange={() => {}} value="value" />);
    expect(component.find("input").prop("value")).toBe("value");
  });

  test("renders input with given name", () => {
    const component = shallow(<InputGroup name="test" onChange={() => {}} value="value" />);
    expect(component.find("input").prop("name")).toBe("test");
  });

  test("renders input with name as id", () => {
    const component = shallow(<InputGroup name="test" onChange={() => {}} value="value" />);
    expect(component.find("input").prop("id")).toBe("test");
  });

  test("renders label as capitalized name", () => {
    const component = shallow(<InputGroup name="test" onChange={() => {}} value="value" />);
    expect(component.find("label").text()).toBe("Test");
  });

  test("calls onChange when changed", () => {
    const onChange = jest.fn(() => {});
    const component = shallow(<InputGroup name="test" onChange={onChange} value="value" />);
    component.find("input").simulate("change", { target: { name: "test", value: "1" } });

    expect(onChange).toHaveBeenCalled();
  });

  test("calls onChange with new value", () => {
    const onChange = jest.fn(() => {});
    const change = { target: { name: "test", value: "1" } };

    const component = shallow(<InputGroup name="test" onChange={onChange} value="value" />);
    component.find("input").simulate("change", change);

    expect(onChange).toHaveBeenCalledWith(change);
  });
});
