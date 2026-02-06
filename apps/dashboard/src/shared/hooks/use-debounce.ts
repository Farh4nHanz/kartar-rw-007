import { useEffect, useState } from "react";

/**
 * A hook to debounce a value with a given delay.
 *
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}
