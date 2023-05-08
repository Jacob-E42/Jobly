import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";

const LoginForm = () => {
	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	const handleChange = event => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		const login = useContext(UserContext);
		// handle form submission logic here
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
