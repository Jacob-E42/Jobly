import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

test("Alert renders without crashing", () => {
	render(<Alert />);
});

test("Alert matches snapshot", () => {
	const { asFragment } = render(<Alert />);
	expect(asFragment()).toMatchSnapshot();
});
