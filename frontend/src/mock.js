import React, { useCallback, useState } from "react";
import UserContext from "./UserContext";

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
			console.debug("login:", "currentUser", currentUser);
			const logintoken = await JoblyApi.login(username, password);
			if (logintoken) {
				setCurrentUser(demoUser);
			}
		},
		[currentUser]
	); // depends on currentUser

	return <UserContext.Provider value={{ currentUser, login }}>{children}</UserContext.Provider>;
};

export { UserProvider, AnonUserProvider };
