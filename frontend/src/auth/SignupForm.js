import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
	// State to store form data
	const [form, setForm] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: ""
	});

	// Access the signup function from the UserContext
	const { signup } = useContext(UserContext);

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
			// Call the signup function with the form data
			await signup(form);
			// Navigate to the "/profile" page after successful signup
			navigate("/profile");
		} catch (error) {
			// Log any errors that occur during signup
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
			<FormGroup>
				<Label for="firstName">First Name</Label>
				<Input
					type="text"
					name="firstName"
					id="firstName"
					value={form.firstName}
					onChange={handleChange}
					placeholder="Enter your first name"
				/>
			</FormGroup>
			<FormGroup>
				<Label for="lastName">Last Name</Label>
				<Input
					type="text"
					name="lastName"
					id="lastName"
					value={form.lastName}
					onChange={handleChange}
					placeholder="Enter your last name"
				/>
			</FormGroup>
			<FormGroup>
				<Label for="email">Email</Label>
				<Input
					type="email"
					name="email"
					id="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Enter your email"
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

export default SignupForm;
