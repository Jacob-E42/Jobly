import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../mock";
import Profile from "./Profile";

test("Profile renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<Profile />
			</UserProvider>
		</MemoryRouter>
	);
});

test("Profile matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<Profile />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
