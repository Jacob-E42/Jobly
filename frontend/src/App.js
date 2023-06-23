import { useState, useEffect } from "react";
import "./App.css";
import UserContext from "./UserContext";
import JoblyApi from "./api/api";
import RouterComponent from "./routes/Router";
import jwtDecode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

function App() {
	const [token, setToken] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(
		function loadUserInfo() {
			console.debug("App useEffect loadUserInfo", "token=", token);

			async function getCurrentUser() {
				if (token) {
					try {
						const { username } = jwtDecode(token);
						// put the token on the Api class so it can use it to call the API.
						JoblyApi.token = token;
						const currentUser = await JoblyApi.getCurrentUser(username);
						setCurrentUser(currentUser);
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
			}

			getCurrentUser();
		},
		[token]
	);

	const login = (username, password) => {
		const logintoken = JoblyApi.login(username, password);

		if (logintoken) {
			setToken(token => logintoken);
		}
	};

	const logout = () => {
		setToken(null);
		setCurrentUser(null);
	};

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, login, logout }}>
				<div className="App">
					<RouterComponent />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
