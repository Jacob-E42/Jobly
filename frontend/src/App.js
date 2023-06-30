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
						const { username } = await jwtDecode(token);
						// put the token on the Api class so it can use it to call the API.
						JoblyApi.token = token;
						const currentUser = await JoblyApi.getCurrentUser(username);
						console.log("current user received", currentUser);
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

	const login = async (username, password) => {
		console.debug("login:", "currentUser", currentUser, "token", token);
		const logintoken = await JoblyApi.login(username, password);
		console.log("token recieved", logintoken);
		if (logintoken) {
			setToken(token => logintoken);
		}
	};

	const signup = async data => {
		console.debug("signup:", "currentUser", currentUser, "token", token, data);
		const { username, password, firstName, lastName, email } = data;
		const signupToken = await JoblyApi.register(username, password, firstName, lastName, email);
		console.log("token recieved", signupToken);
		if (signupToken) {
			setToken(token => signupToken);
		}
	};

	const logout = () => {
		console.debug("logout");
		setToken(null);
		setCurrentUser(null);
	};

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, login, logout, signup }}>
				<div className="App">
					<RouterComponent />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
