import { useState } from "react";
import "./App.css";
import UserProvider from "./UserProvider";
import { UserContext } from "./UserContext";
import JoblyApi from "./api/api";
import Router from "./routes/Router";

function App() {
	const [tokin, setTokin] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const login = (username, password) => {
		const loginTokin = JoblyApi.login(username, password);

		if (loginTokin) {
			setTokin(loginTokin);
		}

		setCurrentUser({ username, password });
	};

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, login }}>
			<div className="App">
				<Router />
			</div>
		</UserContext.Provider>
	);
}

export default App;
