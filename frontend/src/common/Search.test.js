import React from "react";
import { render } from "@testing-library/react";
import Search from "./Search";

test("Search renders without crashing", () => {
	render(<Search />);
});

test("Search matches snapshot", () => {
	const { asFragment } = render(<Search />);
	expect(asFragment()).toMatchSnapshot();
});
