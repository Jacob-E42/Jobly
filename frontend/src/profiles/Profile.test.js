import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";

test("Profile renders without crashing", () => {
	render(<Profile />);
});

test("Profile matches snapshot", () => {
	const { asFragment } = render(<Profile />);
	expect(asFragment()).toMatchSnapshot();
});
