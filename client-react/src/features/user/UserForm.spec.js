import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

import UserForm from "./UserForm";

describe("UserForm", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<UserForm actionText="test" handleSubmit={() => {}} />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders inputGroup with username and password inputs", () => {
    const component = shallow(<UserForm actionText="test" handleSubmit={() => {}} />);

    expect(component.find("InputGroup")).toHaveLength(2);
    expect(component.find("InputGroup").at(0).prop("name")).toBe("username");
    expect(component.find("InputGroup").at(1).prop("name")).toBe("password");
  });

  test("requires username and password to be required", () => {
    const component = mount(<UserForm actionText="test" handleSubmit={() => {}} />);

    expect(component.find("InputGroup").at(0).find("input").prop("required")).toBeTruthy();
    expect(component.find("InputGroup").at(1).find("input").prop("required")).toBeTruthy();
  });

  test("renders button with given actionText", () => {
    const actionText = "test";
    const component = shallow(<UserForm actionText={actionText} handleSubmit={() => {}} />);

    expect(component.find("button")).toHaveLength(1);
    expect(component.find("button").text()).toBe(actionText);
  });

  test("calls handleSubmit when button is clicked", () => {
    const handleSubmit = jest.fn(() => {});
    const component = mount(<UserForm actionText="test" handleSubmit={handleSubmit} />);

    component.find("button").simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });
});
