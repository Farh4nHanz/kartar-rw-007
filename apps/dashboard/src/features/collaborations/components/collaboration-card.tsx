import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Building, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/features/categories/services";
import type { Collaboration } from "@/features/collaborations/services";
import type { Period } from "@/features/periods/services";
import { DeleteCollaborationModal } from "./modals/delete-collaboration-modal";
import { EditCollaborationModal } from "./modals/edit-collaboration-modal";

function CollaborationCard({
	collaboration,
	categories,
	periods,
}: {
	collaboration: Collaboration;
	categories: Category[];
	periods: Period[];
}) {
	const [isDeleteCollaborationModalOpen, setIsDeleteCollaborationModalOpen] =
		useState(false);
	const [isEditCollaborationModalOpen, setIsEditCollaborationModalOpen] =
		useState(false);

	return (
		<Card className="bg-primary/15 ring-primary/15 transition-shadow hover:shadow-md">
			<CardContent className="flex items-start gap-4">
				<Avatar size="lg" className="data-[size=lg]:size-14">
					<AvatarImage src={collaboration.logo_url || ""} />
					<AvatarFallback>
						<Building />
					</AvatarFallback>
				</Avatar>

				<div className="flex-1 space-y-0.5">
					<h4 className="mb-2 font-bold text-sm">
						{collaboration.partner_name}
					</h4>

					<p className="font-semibold text-muted-foreground text-xs">
						{collaboration.category.name}
					</p>
					<p className="text-muted-foreground text-xs">
						Periode {collaboration.period.start_year}-
						{collaboration.period.end_year}
					</p>
				</div>
			</CardContent>

			<CardFooter className="w-full items-center justify-center gap-2">
				<Button
					className="flex-1"
					onClick={() => setIsEditCollaborationModalOpen(true)}
				>
					<Edit2 />
					Edit
				</Button>

				<EditCollaborationModal
					isModalOpen={isEditCollaborationModalOpen}
					setIsModalOpen={setIsEditCollaborationModalOpen}
					selectedData={collaboration}
					categories={categories}
					periods={periods}
				/>

				<Button
					variant="destructive"
					className="flex-1"
					onClick={() => setIsDeleteCollaborationModalOpen(true)}
				>
					<Trash2 />
					Hapus
				</Button>

				<DeleteCollaborationModal
					isModalOpen={isDeleteCollaborationModalOpen}
					setIsModalOpen={setIsDeleteCollaborationModalOpen}
					selectedData={collaboration}
				/>
			</CardFooter>
		</Card>
	);
}

function CollaborationCardSkeleton() {
	return Array.from({ length: 6 }, () => (
		<Card
			key={Math.random() * 100}
			className="bg-primary/15 ring-primary/15 transition-shadow hover:shadow-md"
		>
			<CardContent className="flex items-start gap-4">
				<Skeleton className="size-16 rounded-full" />
				<div className="flex-1">
					<Skeleton className="mb-2 h-4 w-48" />

					<Skeleton className="mb-2 h-4 w-24" />
					<Skeleton className="h-4 w-32" />
				</div>
			</CardContent>

			<CardFooter className="w-full items-center justify-center gap-2">
				<Skeleton className="h-6 w-fit flex-1" />
				<Skeleton className="h-6 w-fit flex-1" />
			</CardFooter>
		</Card>
	));
}

export { CollaborationCard, CollaborationCardSkeleton };
