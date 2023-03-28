import React, { useState } from "react";
import { Alert } from "reactstrap";

function AlertMessage({ msg, color = "primary" }) {
	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);

	return (
		<Alert
			color={color}
			isOpen={visible}
			toggle={onDismiss}>
			{msg}
		</Alert>
	);
}

export default AlertMessage;
