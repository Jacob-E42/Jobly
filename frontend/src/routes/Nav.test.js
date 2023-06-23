import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testMock";
import Nav from "./Nav";

test("Nav renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<Nav />
			</UserProvider>
		</MemoryRouter>
	);
});

test("Nav matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<Nav />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider currentUser={null}>
				<Nav />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
