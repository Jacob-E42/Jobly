import React, { useContext, useState, useCallback } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../context_providers/UserContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import useForm from "../hooks/useForm";
import AlertContext from "../context_providers/AlertContext";

const SignupForm = () => {
	// State to store form data
	const [form, handleChange] = useForm({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: ""
	});

	// Access the signup function from the UserContext
	const { signup } = useContext(UserContext);

	const { setMsg, setColor } = useContext(AlertContext);

	// Access the navigate function from react-router-dom
	const navigate = useNavigate();

	// Handle form submission
	const handleSubmit = useCallback(
		async event => {
			event.preventDefault();
			try {
				// Call the signup function with the form data
				await signup(form);
				setColor("success");
				setMsg("Thanks for signing up!");
				// Navigate to the "/profile" page after successful signup
				navigate("/");
			} catch (error) {
				// Log any errors that occur during signup
				console.log(error);
			}
		},
		[form, signup, navigate]
	); // depends on form, signup, and navigate

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
			<FormGroup className="form-item">
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
			<FormGroup className="form-item">
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
			<FormGroup className="form-item">
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
