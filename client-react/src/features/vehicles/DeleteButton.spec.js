import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<DeleteButton error="test" />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("has button with Delete text on it", () => {
    const component = shallow(<DeleteButton />);

    expect(component.find("button")).toHaveLength(1);
    expect(component.find("button").text()).toBe("Delete");
  });

  test("only changes button text on first button click", () => {
    const handleRemove = jest.fn(() => {});
    const component = shallow(<DeleteButton handleRemove={handleRemove} />);

    component.find("button").simulate("click");
    expect(component.find("button").text()).toBe("Are you sure?");
    expect(handleRemove).not.toHaveBeenCalled();
  });

  test("calls handleRemove function on second button click", () => {
    const handleRemove = jest.fn(() => {});
    const component = shallow(<DeleteButton handleRemove={handleRemove} />);

    component.find("button").simulate("click");
    component.find("button").simulate("click");
    expect(handleRemove).toHaveBeenCalled();
  });
});
