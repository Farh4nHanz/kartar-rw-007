/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import { useState } from "react";

export function useFilter(data: Record<string, any>[]) {
	const [filter, setFilter] = useState("Semua");

	const categories = ["Semua", ...new Set(data.map((d) => d.category))];

	const filteredData =
		filter === "Semua" ? data : data.filter((d) => d.category === filter);

	return {
		filter,
		setFilter,
		categories,
		filteredData,
	};
}
