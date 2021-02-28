import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";

import AddVehicleForm from "./AddVehicleForm";

describe("AddVehicleForm", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<AddVehicleForm onAdd={() => {}} />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("renders inputGroup with model, make and year inputs", () => {
    const component = shallow(<AddVehicleForm onAdd={() => {}} />);

    expect(component.find("InputGroup")).toHaveLength(3);
    expect(component.find("InputGroup").at(0).prop("name")).toBe("make");
    expect(component.find("InputGroup").at(1).prop("name")).toBe("model");
    expect(component.find("InputGroup").at(2).prop("name")).toBe("year");
  });

  test("requires model, make and year to be required", () => {
    const component = mount(<AddVehicleForm onAdd={() => {}} />);

    expect(component.find("InputGroup").at(0).find("input").prop("required")).toBeTruthy();
    expect(component.find("InputGroup").at(1).find("input").prop("required")).toBeTruthy();
    expect(component.find("InputGroup").at(2).find("input").prop("required")).toBeTruthy();
  });

  test("renders button with given Add new text", () => {
    const actionText = "Add new";
    const component = shallow(<AddVehicleForm onAdd={() => {}} />);

    expect(component.find("button")).toHaveLength(1);
    expect(component.find("button").text()).toBe(actionText);
  });

  test("calls handleSubmit when button is clicked", () => {
    const onAdd = jest.fn(() => {});
    const component = mount(<AddVehicleForm onAdd={onAdd} />);

    component.find("button").simulate("submit");
    expect(onAdd).toHaveBeenCalled();
  });
});
