import type { IconType } from "@workspace/ui/types/icon";
import type {
	RecentGalleries,
	RecentNews,
} from "@/features/dashboard/services";

export type StatisticCardProps = {
	title: string;
	metric: number;
	icon: IconType;
};

export type StatisticCardHeaderProps = Pick<
	StatisticCardProps,
	"title" | "icon"
>;

export type StatisticCardContentProps = Pick<StatisticCardProps, "metric">;

export type RecentNewsProps = {
	data: RecentNews[];
};

export type RecentGalleriesProps = {
	data: RecentGalleries[];
};
