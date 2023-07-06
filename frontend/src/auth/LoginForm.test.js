import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { UserProvider, AnonUserProvider } from "../mock";
import { MemoryRouter } from "react-router";
import LoginForm from "./LoginForm";
import JoblyApi from "../api/api";

jest.mock("../api/api", () => ({
	login: jest.fn(() => Promise.resolve("mockToken"))
}));

test("LoginForm renders without crashing", () => {
	render(
		<MemoryRouter>
			<AnonUserProvider>
				<LoginForm />
			</AnonUserProvider>
		</MemoryRouter>
	);
});

test("LoginForm matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<AnonUserProvider>
				<LoginForm />
			</AnonUserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("LoginForm displays username and password inputs", () => {
	render(
		<MemoryRouter>
			<AnonUserProvider>
				<LoginForm />
			</AnonUserProvider>
		</MemoryRouter>
	);
	expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
});

test("login works", async () => {
	const { getByLabelText, getByText } = render(
		<MemoryRouter>
			<AnonUserProvider>
				<LoginForm />
			</AnonUserProvider>
		</MemoryRouter>
	);

	// Fill out the form
	fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });

	// Submit the form

	fireEvent.click(screen.getByText(/submit/i));

	// Wrap the form submission in act
	// await act(async () => {
	// 	fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
	// 	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });
	// 	fireEvent.click(screen.getByText(/submit/i));
	// });

	// Since login is an asynchronous operation, we need to wait for it to complete
	await waitFor(() => expect(JoblyApi.login).toHaveBeenCalledWith("testuser", "testpass"));

	// Check that the login function was called with the correct arguments
	expect(JoblyApi.login).toHaveBeenCalledWith("testuser", "testpass");
});
