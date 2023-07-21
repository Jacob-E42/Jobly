import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App renders without crashing", () => {
	render(<App />);
});

test("App matches snapshot", () => {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
});
