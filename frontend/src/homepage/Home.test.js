import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider, AnonUserProvider } from "../mock";
import Home from "./Home";

test("Home renders without crashing", () => {
	render(
		<MemoryRouter>
			<AnonUserProvider>
				<Home />
			</AnonUserProvider>
		</MemoryRouter>
	);
});

test("Home matches snapshot for logged in user", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<Home />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("Home matches snapshot for anon user", () => {
	const { asFragment } = render(<MemoryRouter></MemoryRouter>);
	expect(asFragment()).toMatchSnapshot();
});
