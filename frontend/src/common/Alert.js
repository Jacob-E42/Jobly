import React, { useState } from "react";
import { Alert } from "reactstrap";

function AlertMessage({ msg, color = "primary" }) {
	// State to control the visibility of the alert message
	const [visible, setVisible] = useState(true);

	// Function to dismiss the alert message
	const onDismiss = () => setVisible(false);

	return (
		<Alert
			// Set the color of the alert message
			color={color}
			// Specify if the alert is visible or hidden
			isOpen={visible}
			// Function to toggle the visibility of the alert
			toggle={onDismiss}>
			{msg}
		</Alert>
	);
}

export default AlertMessage;
