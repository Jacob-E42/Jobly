import { useEffect, useCallback } from "react";
import "./App.css";
import UserContext from "./UserContext";
import JoblyApi from "./api/api";
import RouterComponent from "./routes/Router";
import jwtDecode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [token, setToken] = useLocalStorage("token", null);
	const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
	console.log("token", token, "currentuser", currentUser);

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

						setCurrentUser(currentUser);
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
			}

			getCurrentUser();
		},
		[token, setCurrentUser]
	);

	const login = useCallback(
		async (username, password) => {
			console.debug("login:", "currentUser", currentUser, "token", token);
			const logintoken = await JoblyApi.login(username, password);

			if (logintoken) {
				setToken(logintoken);
			}
		},
		[currentUser, token, setToken]
	); // depends on currentUser and token

	const signup = useCallback(
		async data => {
			console.debug("signup:", "currentUser", currentUser, "token", token);
			const { username, password, firstName, lastName, email } = data;
			const signupToken = await JoblyApi.register(username, password, firstName, lastName, email);
			console.log("token received", signupToken);
			if (signupToken) {
				setToken(signupToken);
			}
		},
		[currentUser, token, setToken]
	); // depends on currentUser and token

	const updateCurrentUser = useCallback(
		async data => {
			console.debug("updateCurrentUser:", "data", data);
			const { username, password } = data;
			delete data.username;
			if (!password) delete data.password;
			const updatedUser = await JoblyApi.editCurrentUser(username, data);
			console.log("new user", updatedUser);
			if (updatedUser) {
				setCurrentUser(updatedUser);
			}
		},
		[setCurrentUser]
	); // depends on currentUser and token

	const logout = useCallback(() => {
		console.debug("logout");
		setToken(null);
		setCurrentUser(null);
	}, [setCurrentUser, setToken]); // does not depend on any state or props

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, login, logout, signup, updateCurrentUser }}>
				<div className="App">
					<RouterComponent />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
