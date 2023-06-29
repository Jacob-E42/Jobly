import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

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
	const handleChange = event => {
		// Update the form state with the new input value
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
	};

	// Handle form submission
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			// Call the login function with the username and password from the form
			await login(form.username, form.password);
			// Navigate to the "/login" page after successful login
			navigate("/profile");
		} catch (error) {
			// Log any errors that occur during login
			console.log(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
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
			<FormGroup>
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
