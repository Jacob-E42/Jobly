import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	const { login } = useContext(UserContext);
	const navigate = useNavigate();

	const handleChange = event => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			await login(form.username, form.password);
			navigate("/login");
		} catch (error) {
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
