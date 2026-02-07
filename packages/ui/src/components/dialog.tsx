/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type * as React from "react";

function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay asChild {...props}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				data-slot="dialog-overlay"
				className={cn(
					"pointer-events-none fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs",
					className,
				)}
				onClick={(e) => e.stopPropagation()}
			/>
		</DialogPrimitive.Overlay>
	);
}

function DialogContent({
	className,
	children,
	open = false,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	open: boolean;
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal forceMount>
			<AnimatePresence>
				{open ? (
					<>
						<DialogOverlay key="dialog-overlay" />
						<DialogPrimitive.Content
							asChild
							{...props}
							onPointerDownOutside={
								(props as any).onPointerDownOutside ??
								((e: any) => e.preventDefault())
							}
							onInteractOutside={
								(props as any).onInteractOutside ??
								((e: any) => e.preventDefault())
							}
							onEscapeKeyDown={
								(props as any).onEscapeKeyDown ??
								((e: any) => e.preventDefault())
							}
						>
							<motion.div
								key="dialog-content"
								data-slot="dialog-content"
								initial={{ opacity: 0, scale: 0.95, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 10 }}
								transition={{
									type: "spring",
									stiffness: 450,
									damping: 25,
								}}
								className={cn(
									"fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-background p-6 text-sm ring-1 ring-foreground/10 sm:max-w-md",
									className,
								)}
							>
								{children}

								{showCloseButton ? (
									<DialogPrimitive.Close data-slot="dialog-close" asChild>
										<Button
											variant="ghost"
											className="absolute top-4 right-4"
											size="icon-sm"
										>
											<XIcon />
											<span className="sr-only">Close</span>
										</Button>
									</DialogPrimitive.Close>
								) : null}
							</motion.div>
						</DialogPrimitive.Content>
					</>
				) : null}
			</AnimatePresence>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close asChild>
					<Button variant="outline">Close</Button>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("font-medium leading-none", className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
