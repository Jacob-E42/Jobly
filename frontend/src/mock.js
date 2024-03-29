import React, { useCallback, useState } from "react";
import UserContext from "./context_providers/UserContext";
import ApplicationsContext from "./context_providers/ApplicationsContext";
import AlertContext from "./context_providers/AlertContext";
import JoblyApi from "./api/api";

const demoUser = {
	username: "testuser",
	first_name: "testfirst",
	last_name: "testlast",
	email: "test@test.net",
	photo_url: null
};

const UserProvider = ({ children, currentUser = demoUser }) => {
	const [token, setToken] = useState(null);

	return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};

const AnonUserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const login = useCallback(
		async (username, password) => {
			const logintoken = await JoblyApi.login(username, password);
			if (logintoken) {
				setCurrentUser(demoUser);
			}
		},
		[currentUser]
	); // depends on currentUser

	const signup = useCallback(
		async data => {
			const { username, password, firstName, lastName, email } = data;
			const signupToken = await JoblyApi.register(username, password, firstName, lastName, email);
			if (signupToken) {
				setCurrentUser(signupToken);
			}
		},
		[currentUser]
	); // depends on currentUser and token

	return <UserContext.Provider value={{ currentUser, login, signup }}>{children}</UserContext.Provider>;
};

const ApplicationsProvider = ({ children }) => {
	const [applications, setApplications] = useState([]);

	const apply = useCallback(
		async (username, jobId) => {
			const applied = await JoblyApi.applyToJob(username, jobId);
			if (applied.applied === jobId) {
				setApplications(applications => [...applications, jobId]);
			}
		},
		[setApplications]
	);
	return <ApplicationsContext.Provider value={{ applications, apply }}>{children}</ApplicationsContext.Provider>;
};

const AlertProvider = ({ children }) => {
	const [msg, setMsg] = useState("");
	const [color, setColor] = useState("primary");

	return <AlertContext.Provider value={{ msg, setMsg, color, setColor }}>{children}</AlertContext.Provider>;
};

export { UserProvider, AnonUserProvider, ApplicationsProvider, AlertProvider };
