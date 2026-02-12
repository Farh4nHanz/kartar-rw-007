/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import { useState } from "react";

export function useFilter<T extends { category: { name: string } }>(
	data: T[],
): {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	categories: string[];
	filteredData: T[];
} {
	const [filter, setFilter] = useState<string>("semua");

	const categories = [
		"semua",
		...new Set(data.map((d) => d.category.name.toLowerCase())),
	];

	const filteredData =
		filter === "semua"
			? data
			: data.filter((d) => d.category.name.toLowerCase() === filter);

	return {
		filter,
		setFilter,
		categories,
		filteredData,
	};
}
