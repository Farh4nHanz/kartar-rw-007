import { type Updater, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { PaginationState } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
	DataTablePagination,
	DataTableRowLimit,
	DataTableSearchFilter,
} from "@workspace/ui/components/data-table";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	GalleryCard,
	GalleryCardSkeleton,
} from "@/features/galleries/components/gallery-card";
import {
	GalleryGrid,
	GalleryGridEmpty,
	GalleryGridError,
} from "@/features/galleries/components/gallery-grid";
import { getAllGalleriesQueryOptions } from "@/features/galleries/hooks/query-options";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useErrorToast } from "@/shared/hooks/use-error-toast";

export function GalleryList() {
	const navigate = useNavigate({
		from: "/galeri",
	});

	const search = useSearch({
		from: "/(app)/(publication)/galeri/_index",
	});

	const { page, limit, name } = search;

	const {
		data: galleries,
		isLoading: isGalleriesFetchLoading,
		isError: isGalleriesFetchError,
		error: galleriesFetchError,
		refetch,
	} = useQuery(getAllGalleriesQueryOptions(search));

	/* ===================
	 * Show toast on error
	 * =================== */
	useErrorToast(galleriesFetchError);

	/* ===================
	 * Global search (debounced)
	 * =================== */
	const globalFilter = name ?? "";
	const [nameSearch, setNameSearch] = useState(globalFilter);

	useEffect(() => setNameSearch(globalFilter), [globalFilter]);

	const debouncedSearch = useDebounce(nameSearch, 1000);

	// Update the url only when the debounced search changes
	useEffect(() => {
		navigate({
			search: (prev) => ({
				...prev,
				title: debouncedSearch || undefined,
				page: 1,
			}),
		});
	}, [debouncedSearch, navigate]);

	/* ===================
	 * Pagination (server-side)
	 * =================== */
	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: (page || 1) - 1,
			pageSize: limit || 10,
		}),
		[page, limit],
	);

	const setPagination = useCallback(
		(updater: Updater<PaginationState, PaginationState>) => {
			const next =
				typeof updater === "function" ? updater(pagination) : updater;

			navigate({
				search: (prev) => ({
					...prev,
					page: 1,
					limit: next.pageSize,
				}),
			});
		},
		[pagination, navigate],
	);

	return (
		<>
			<div className="flex flex-wrap justify-between gap-10 max-md:flex-col-reverse md:items-center">
				{/* Search */}
				<DataTableSearchFilter
					id="name_search"
					name="name_search"
					placeholder="Cari galeri berdasarkan nama..."
					value={nameSearch}
					onChange={(e) => setNameSearch(e.target.value)}
				/>

				{/* Add Gallery Button */}
				<Button className="max-md:self-end" asChild>
					<Link to="/galeri/new">
						<Plus /> Tambah Galeri
					</Link>
				</Button>
			</div>

			{/* Limit Filter */}
			<DataTableRowLimit
				current={limit || 10}
				onLimitChange={(newLimit) =>
					setPagination((p) => ({ ...p, pageSize: newLimit }))
				}
				disabled={
					!galleries?.data.length ||
					isGalleriesFetchLoading ||
					isGalleriesFetchError
				}
			/>

			{/* Main Content */}
			{isGalleriesFetchLoading ? (
				// Loading UI
				<GalleryGrid>
					{Array.from({ length: 6 }, () => (
						<GalleryCardSkeleton key={Math.random()} />
					))}
				</GalleryGrid>
			) : isGalleriesFetchError ? (
				// Error UI
				<GalleryGridError
					message={galleriesFetchError.message}
					onRetry={refetch}
				/>
			) : !galleries?.data.length ? (
				// Empty UI
				<GalleryGridEmpty />
			) : (
				// Actual Content
				<GalleryGrid>
					{galleries?.data.map((gallery) => (
						<GalleryCard key={gallery.id} gallery={gallery} />
					))}
				</GalleryGrid>
			)}

			{galleries?.data.length ? (
				<DataTablePagination
					currentPage={pagination.pageIndex + 1}
					totalPages={galleries?.meta.totalPages || 1}
					onPageChange={(page) =>
						navigate({
							search: (prev) => ({ ...prev, page }),
						})
					}
				/>
			) : null}
		</>
	);
}
