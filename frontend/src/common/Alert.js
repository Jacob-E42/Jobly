import React, { useState } from "react";
import { Alert as Al } from "reactstrap";

function Alert({ msg, color = "success" }) {
	console.debug("Alert", "messages=", msg, "color=", color);

	// State to control the visibility of the alert message
	const [visible, setVisible] = useState(true);

	// Function to dismiss the alert message
	const onDismiss = () => setVisible(false);

	return (
		<Al
			// Set the color of the alert message
			color={color}
			// Specify if the alert is visible or hidden
			isOpen={visible}
			// Function to toggle the visibility of the alert
			toggle={onDismiss}>
			{msg}
		</Al>
	);
}

export default Alert;

// import React from "react";

// /** Presentational component for showing bootstrap-style alerts.
//  *
//  * { LoginForm, SignupForm, ProfileForm } -> Alert
//  **/

// function Alert({ type = "danger", messages = [] }) {
// 	console.debug("Alert", "type=", type, "messages=", messages);

// 	return (
// 		<div
// 			className={`alert alert-${type}`}
// 			role="alert">
// 			{messages.map(error => (
// 				<p
// 					className="mb-0 small"
// 					key={error}>
// 					{error}
// 				</p>
// 			))}
// 		</div>
// 	);
// }

// export default Alert;
