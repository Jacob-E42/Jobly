import React from "react";
import { render } from "@testing-library/react";
import Router from "./Router";

test("Router renders without crashing", () => {
	render(<Router />);
});

test("Router matches snapshot", () => {
	const { asFragment } = render(<Router />);
	expect(asFragment()).toMatchSnapshot();
});
