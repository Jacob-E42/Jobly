import { useState } from "react";
import "./App.css";
import UserContext from "./UserContext";
import JoblyApi from "./api/api";
import Router from "./routes/Router";

function App() {
	const [tokin, setTokin] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const login = (username, password) => {
		const loginTokin = JoblyApi.login(username, password);

		if (loginTokin) {
			setTokin(tokin => loginTokin);
		}

		setCurrentUser({ username, password });
	};

	const logout = () => {
		setTokin(null);
		setCurrentUser(null);
	};

	return (
		<UserContext.Provider value={{ currentUser, login, logout }}>
			<div className="App">
				<Router />
			</div>
		</UserContext.Provider>
	);
}

export default App;
