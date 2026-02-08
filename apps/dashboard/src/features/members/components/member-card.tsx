import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Edit2, Trash2, User } from "lucide-react";
import type { Member } from "@/features/members/services";

function MemberCard({ member }: { member: Member }) {
	return (
		<Card className="bg-primary/15 ring-primary/15 transition-shadow hover:shadow-md">
			<CardContent className="flex items-start gap-4">
				<Avatar size="lg" className="data-[size=lg]:size-14">
					<AvatarImage src={member.photo_url || ""} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>

				<div className="flex-1 space-y-0.5">
					<h4 className="mb-2 font-bold text-sm">{member.name}</h4>

					<p className="font-semibold text-muted-foreground text-xs">
						{member.positions.name}
					</p>
					<p className="text-muted-foreground text-xs">
						Periode {member.periods.start_year}-{member.periods.end_year}
					</p>
				</div>
			</CardContent>

			<CardFooter className="w-full items-center justify-center gap-2">
				<Button className="flex-1">
					<Edit2 />
					Edit
				</Button>
				<Button variant="destructive" className="flex-1">
					<Trash2 />
					Hapus
				</Button>
			</CardFooter>
		</Card>
	);
}

function MemberCardSkeleton() {
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

export { MemberCard, MemberCardSkeleton };
