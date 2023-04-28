import { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
