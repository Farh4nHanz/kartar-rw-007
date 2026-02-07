import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Images, Newspaper, Users } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
	RecentGalleries,
	RecentGalleriesEmpty,
	RecentGalleriesSkeleton,
} from "@/features/dashboard/components/recent-galleries";
import {
	RecentNews,
	RecentNewsEmpty,
	RecentNewsSkeleton,
} from "@/features/dashboard/components/recent-news";
import {
	StatisticCard,
	StatisticCardGrid,
} from "@/features/dashboard/components/statistic-card";
import {
	dashboardStatisticsQueryOptions,
	recentGalleriesQueryOptions,
	recentNewsQueryOptions,
} from "@/features/dashboard/hooks/query-options";

export const Route = createFileRoute("/(app)/(menu)/")({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(dashboardStatisticsQueryOptions()),
});

function RouteComponent() {
	/**
	 * =============================
	 * Dashboard Stats data fetch
	 * =============================
	 */
	const {
		data: statisticsData,
		isError: isStatisticsDataFetchError,
		error: statisticsDataFetchError,
	} = useQuery(dashboardStatisticsQueryOptions());

	/**
	 * =============================
	 * Recent News data fetch
	 * =============================
	 */
	const {
		data: recentNewsData,
		isLoading: isRecentNewsDataFetchLoading,
		isError: isRecentNewsDataFetchError,
		error: recentNewsDataFetchError,
	} = useQuery(recentNewsQueryOptions());

	/**
	 * =============================
	 * Recent Galeries data fetch
	 * =============================
	 */
	const {
		data: recentGalleriesData,
		isLoading: isRecentGalleriesDataFetchLoading,
		isError: isRecentGalleriesDataFetchError,
		error: recentGalleriesDataFetchError,
	} = useQuery(recentGalleriesQueryOptions());

	/**
	 * =============================
	 * Show toast when error occurs
	 * =============================
	 */
	useEffect(() => {
		if (
			isStatisticsDataFetchError ||
			isRecentNewsDataFetchError ||
			isRecentGalleriesDataFetchError
		) {
			const message =
				statisticsDataFetchError?.message ||
				recentNewsDataFetchError?.message ||
				recentGalleriesDataFetchError?.message;

			toast.error(message, {
				duration: 5000,
				closeButton: true,
				dismissible: true,
			});
		}
	}, [
		isStatisticsDataFetchError,
		isRecentNewsDataFetchError,
		isRecentGalleriesDataFetchError,
		statisticsDataFetchError,
		recentNewsDataFetchError,
		recentGalleriesDataFetchError,
	]);

	/**
	 * =============================
	 * Render dashboard stats
	 * =============================
	 */
	const stats = useMemo(
		() => [
			{
				label: "Total Anggota Aktif",
				value: statisticsData?.totalActiveMembers || 0,
				icon: Users,
			},
			{
				label: "Total Program & Kegiatan",
				value: statisticsData?.totalPrograms || 0,
				icon: FileText,
			},
			{
				label: "Total Galeri",
				value: statisticsData?.totalGalleries || 0,
				icon: Images,
			},
			{
				label: "Total Berita",
				value: statisticsData?.totalNews || 0,
				icon: Newspaper,
			},
		],
		[statisticsData],
	);

	return (
		<div className="h-full min-h-dvh w-full space-y-8 overflow-x-auto px-4 pt-20 pb-6">
			<h2 className="mb-2 font-bold text-2xl">Dashboard Karang Taruna RW 07</h2>
			<p className="text-muted-foreground">
				Kelola dan pantau semua kegiatan organisasi Karang Taruna RW 07.
			</p>

			<StatisticCardGrid>
				{stats.map((stat) => (
					<StatisticCard
						key={stat.value}
						title={stat.label}
						metric={stat.value}
						icon={stat.icon}
					/>
				))}
			</StatisticCardGrid>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Recent News */}
				{isRecentNewsDataFetchLoading ? (
					<RecentNewsSkeleton />
				) : !recentNewsData?.length ? (
					<RecentNewsEmpty />
				) : (
					<RecentNews data={recentNewsData || []} />
				)}

				{/* Recent Galleries */}
				{isRecentGalleriesDataFetchLoading ? (
					<RecentGalleriesSkeleton />
				) : !recentGalleriesData?.length ? (
					<RecentGalleriesEmpty />
				) : (
					<RecentGalleries data={recentGalleriesData || []} />
				)}
			</div>
		</div>
	);
}
