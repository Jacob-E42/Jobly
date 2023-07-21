import { useEffect, useCallback, useState } from "react";
import UserContext from "./context_providers/UserContext";
import ApplicationsContext from "./context_providers/ApplicationsContext";
import JoblyApi from "./api/api";
import RouterComponent from "./routes/Router";
import jwtDecode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertContext from "./context_providers/AlertContext";
import LoadingSpinner from "./common/LoadingSpinner";

function App() {
	const [infoLoaded, setInfoLoaded] = useState(false);
	const [token, setToken] = useLocalStorage("token", null);
	const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
	const [applications, setApplications] = useLocalStorage("applications", []);
	const [msg, setMsg] = useState("");
	const [color, setColor] = useState("primary");

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

						let uniqueApplications = [...applications, ...currentUser.applications];
						uniqueApplications = [...new Set(uniqueApplications)];

						setApplications(uniqueApplications);
					} catch (err) {
						console.error("App loadUserInfo: problem loading", err);
						setCurrentUser(null);
						setApplications([]);
					}
				}
				setInfoLoaded(true);
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[token, setApplications, setCurrentUser]
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

	const apply = useCallback(
		async (username, jobId) => {
			console.debug("apply", "username", username, "jobId", jobId);
			const applied = await JoblyApi.applyToJob(username, jobId);
			if (applied.applied === jobId) {
				setApplications(applications => [...applications, jobId]);
			}
		},
		[setApplications]
	);

	if (!infoLoaded) return <LoadingSpinner />;

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUser, login, logout, signup, updateCurrentUser }}>
				<ApplicationsContext.Provider value={{ applications, apply }}>
					<AlertContext.Provider value={{ msg, setMsg, color, setColor }}>
						<div className="App">
							<RouterComponent />
						</div>
					</AlertContext.Provider>
				</ApplicationsContext.Provider>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
