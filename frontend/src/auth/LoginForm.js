import React, { useContext, useState, useCallback } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginForm = () => {
	// State to store form data
	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	// Access the login function from the UserContext
	const { login } = useContext(UserContext);

	// Access the navigate function from react-router-dom
	const navigate = useNavigate();

	// Handle input change
	const handleChange = useCallback(event => {
		// Update the form state with the new input value
		setForm(form => ({
			...form,
			[event.target.name]: event.target.value
		}));
	}, []); // does not depend on any state or props

	// Handle form submission
	const handleSubmit = useCallback(
		async event => {
			if (!login) {
				console.error("login is not defined. Check UserContext");
			}
			event.preventDefault();
			try {
				// Call the login function with the username and password from the form
				await login(form.username, form.password);
				// Navigate to the "/login" page after successful login
				navigate("/");
			} catch (error) {
				// Log any errors that occur during login
				console.log(error);
			}
		},
		[login, navigate, form]
	);

	return (
		<Form
			onSubmit={handleSubmit}
			className="form-container">
			<FormGroup className="form-item">
				<Label for="username">Username</Label>
				<Input
					type="text"
					name="username"
					id="username"
					value={form.username}
					onChange={handleChange}
					placeholder="Enter your username"
				/>
			</FormGroup>
			<FormGroup className="form-item">
				<Label for="password">Password</Label>
				<Input
					type="password"
					name="password"
					id="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter your password"
				/>
			</FormGroup>
			<Button
				color="primary"
				type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default LoginForm;
