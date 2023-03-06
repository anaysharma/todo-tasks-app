import { useEffect } from 'react';
import { useState } from 'react';

export const useLocalStorage = (key, initValue) => {
	const [value, setValue] = useState(() => {
		try {
			const localValue = window.localStorage.getItem(key);
			return localValue ? JSON.parse(localValue) : initValue;
		} catch (error) {
			console.error(error);
			return initValue;
		}
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
