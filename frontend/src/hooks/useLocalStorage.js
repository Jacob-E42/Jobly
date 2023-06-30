import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = () => {
		// Prevent build error "window is undefined" but keep working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	};

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(readValue);

	// Return a wrapped version of useState's setter function that
	// persists the new value to localStorage.
	const setValue = value => {
		// Save state
		setStoredValue(value);

		// Save to local storage
		window.localStorage.setItem(key, JSON.stringify(value));
	};

	// Listen for changes to the value associated with our key in other instances of this app
	useEffect(() => {
		const handleStorageChange = () => {
			setStoredValue(readValue());
		};

		// Check if our key is being modified in another window
		window.addEventListener("storage", handleStorageChange);

		// Cleanup
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [readValue]);

	return [storedValue, setValue];
}

export default useLocalStorage;
