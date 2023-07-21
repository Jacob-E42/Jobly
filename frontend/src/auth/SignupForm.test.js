import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { UserProvider, AnonUserProvider, AlertProvider } from "../mock";
import { MemoryRouter } from "react-router";
import SignupForm from "./SignupForm";
import JoblyApi from "../api/api";

jest.mock("../api/api", () => ({
	register: jest.fn(() => Promise.resolve("mockToken"))
}));

test("SignupForm renders without crashing", () => {
	render(
		<MemoryRouter>
			<AnonUserProvider>
				<AlertProvider>
					<SignupForm />
				</AlertProvider>
			</AnonUserProvider>
		</MemoryRouter>
	);
});

test("SignupForm matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<AnonUserProvider>
				<AlertProvider>
					<SignupForm />
				</AlertProvider>
			</AnonUserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("SignupForm displays required inputs", () => {
	render(
		<MemoryRouter>
			<AnonUserProvider>
				<AlertProvider>
					<SignupForm />
				</AlertProvider>
			</AnonUserProvider>
		</MemoryRouter>
	);
	expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your first name")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your last name")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
});

test("signup works", async () => {
	const { getByLabelText, getByText } = render(
		<MemoryRouter>
			<AnonUserProvider>
				<AlertProvider>
					<SignupForm />
				</AlertProvider>
			</AnonUserProvider>
		</MemoryRouter>
	);

	// Fill out the form
	fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "testpass" } });
	fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "testfirst" } });
	fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "testlast" } });
	fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@test.com" } });

	// Submit the form
	fireEvent.click(screen.getByText(/submit/i));

	// Since signup is an asynchronous operation, we need to wait for it to complete
	await waitFor(() => expect(JoblyApi.register).toHaveBeenCalled());

	// Check that the signup function was called with the correct arguments
	expect(JoblyApi.register).toHaveBeenCalledWith("testuser", "testpass", "testfirst", "testlast", "test@test.com");
});
