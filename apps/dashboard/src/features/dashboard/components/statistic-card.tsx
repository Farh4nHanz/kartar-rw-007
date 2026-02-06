import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import type {
	StatisticCardContentProps,
	StatisticCardHeaderProps,
	StatisticCardProps,
} from "@/features/dashboard/types";

export function StatisticCardGrid({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function StatisticCard({ ...props }: StatisticCardProps) {
	return (
		<Card className="gap-1 py-6">
			<StatisticCardHeader title={props.title} icon={props.icon} />
			<StatisticCardContent metric={props.metric} />
		</Card>
	);
}

function StatisticCardHeader({ title, icon: Icon }: StatisticCardHeaderProps) {
	return (
		<CardHeader className="w-full">
			<CardTitle className="font-body font-medium text-muted-foreground text-sm tracking-tighter">
				{title}
			</CardTitle>

			<CardAction className="rounded-full bg-muted p-2">
				<Icon size={14} />
			</CardAction>
		</CardHeader>
	);
}

function StatisticCardContent({ metric }: StatisticCardContentProps) {
	return (
		<CardContent className="w-full">
			<p className="font-bold font-heading text-2xl">{metric}</p>
		</CardContent>
	);
}
