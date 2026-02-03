import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";

function RouteComponentLoader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex h-dvh w-full items-center justify-center pt-16",
				className,
			)}
			{...props}
		>
			<Loader2 className="animate-spin" />
		</div>
	);
}

function ComponentLoader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center",
				className,
			)}
			{...props}
		>
			<Loader2 className="animate-spin" />
		</div>
	);
}

export { RouteComponentLoader, ComponentLoader };
