import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import ErrorAlert from "./ErrorAlert";

describe("ErrorAlert", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<ErrorAlert error="test" />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("returns null if no error", () => {
    const component = shallow(<ErrorAlert />);

    expect(component.html()).toBe(null);
  });

  test("returns alert with error text when error", () => {
    const component = shallow(<ErrorAlert error="test" />);

    expect(component.find(".alert").text()).toBe("test");
  });
});
