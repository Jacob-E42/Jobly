import React from "react";
import { render } from "@testing-library/react";
import Nav from "./Nav";

test("Nav renders without crashing", () => {
	render(<Nav />);
});

test("Nav matches snapshot", () => {
	const { asFragment } = render(<Nav />);
	expect(asFragment()).toMatchSnapshot();
});
