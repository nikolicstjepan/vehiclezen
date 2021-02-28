import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import NavbarNav from "./NavbarNav";

describe("Navbar", () => {
  test("snapshot renders", () => {
    const component = renderer.create(
      <MemoryRouter>
        <NavbarNav isGuest={true} logout={() => {}} />
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders login and register when user is guest", () => {
    const component = mount(
      <MemoryRouter>
        <NavbarNav isGuest={true} logout={() => {}} />
      </MemoryRouter>
    );

    expect(component.find("a").at(0).text()).toBe("Login");
    expect(component.find("a").at(1).text()).toBe("Register");
  });

  test("renders logout and vehicles when user is guest", () => {
    const component = mount(
      <MemoryRouter>
        <NavbarNav isGuest={false} logout={() => {}} />
      </MemoryRouter>
    );

    expect(component.find("a").at(0).text()).toBe("Vehicles");
    expect(component.find("button").at(0).text()).toBe("Logout");
  });
});
