import React, { useContext } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { UserProvider } from "../mock";
import UserContext from "../UserContext";
import LoginForm from "./LoginForm";

jest.mock("../JoblyApi", () => ({
	login: jest.fn(() => Promise.resolve("mockToken"))
}));

test("LoginForm renders without crashing", () => {
	render(<LoginForm />);
});

test("LoginForm matches snapshot", () => {
	const { asFragment } = render(<LoginForm />);
	expect(asFragment()).toMatchSnapshot();
});

test("LoginForm displays username and password inputs", () => {
	render(
		<UserProvider>
			<LoginForm />
		</UserProvider>
	);
	expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
});

test("Form input values change when they are filled out", () => {
	render(
		<UserProvider>
			<LoginForm />
		</UserProvider>
	);

	const usernameInput = screen.getByPlaceholderText("Enter your username");
	fireEvent.change(usernameInput, { target: { value: "username" } });
	expect(usernameInput.value).toBe("username");

	const passwordInput = screen.getByPlaceholderText("Enter your password");
	fireEvent.change(passwordInput, { target: { value: "password" } });
	expect(passwordInput.value).toBe("password");
});

// This test will depend on the exact behavior of your login function and the NavBar component
test("Submitting the form triggers login and modifies NavBar", async () => {
	const { login } = useContext(UserContext); // mock login function from UserContext
	const navigate = jest.fn(); // mock navigate function from react-router-dom

	// Mock login function to mimic successful login
	jest.spyOn(React, "useContext").mockImplementation(context => {
		if (context === UserContext) {
			return {
				login: jest.fn(() => Promise.resolve()),
				navigate
			};
		}
	});

	render(
		<UserProvider>
			<LoginForm />
		</UserProvider>
	);

	const usernameInput = screen.getByPlaceholderText("Enter your username");
	fireEvent.change(usernameInput, { target: { value: "username" } });

	const passwordInput = screen.getByPlaceholderText("Enter your password");
	fireEvent.change(passwordInput, { target: { value: "password" } });

	// Click the submit button
	fireEvent.click(screen.getByText("Submit"));

	// Wait for promises to resolve
	await waitFor(() => expect(login).toHaveBeenCalledTimes(1));
	await waitFor(() => expect(login).toHaveBeenCalledWith("username", "password"));
	await waitFor(() => expect(navigate).toHaveBeenCalledWith("/"));

	// Here you'd assert that NavBar now shows "Logout" and does not show "Login" and "Signup"
	// This would likely involve rendering the NavBar component and making assertions about its content
});
