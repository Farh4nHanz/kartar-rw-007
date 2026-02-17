import { useEffect } from "react";

type SEOProps = {
	title?: string;
	description?: string;
};

const DEFAULT_SEO = {
	title: "Karang Taruna RW 07",
	description:
		"Karang Taruna RW 07 merupakan wadah pembinaan dan pemberdayaan pemuda tingkat RW yang berfokus pada pengembangan kreativitas, kepedulian sosial, dan partisipasi aktif dalam masyarakat.",
};

export function useSEO({ title, description }: SEOProps) {
	useEffect(() => {
		const prevTitle = document.title;
		const prevDescription =
			document
				.querySelector('meta[name="description"]')
				?.getAttribute("content") ?? "";

		if (title) {
			document.title = title;
		}

		if (description) {
			let meta = document.querySelector('meta[name="description"]');

			if (!meta) {
				meta = document.createElement("meta");
				meta.setAttribute("name", "description");
				document.head.appendChild(meta);
			}

			meta.setAttribute("content", description);
		}

		return () => {
			document.title = prevTitle || DEFAULT_SEO.title;

			let meta = document.querySelector('meta[name="description"]');
			if (!meta) {
				meta = document.createElement("meta");
				meta.setAttribute("name", "description");
				document.head.appendChild(meta);
			}

			meta.setAttribute("content", prevDescription || DEFAULT_SEO.description);
		};
	}, [title, description]);
}
