import type { Tables } from "@workspace/supabase/database.types";
import { supabase } from "@workspace/supabase/supabase";
import { getPublicImageUrl } from "@/lib/utils/get-public-image-url";
import type { SuccessResponseWithData } from "@/types/api";

type GalleryDB = Omit<
	Tables<"galleries">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	images: {
		id: string;
		image_path: string | null;
	}[];
};

export type Gallery = Omit<
	Tables<"galleries">,
	"category_id" | "created_at" | "updated_at"
> & {
	category: Pick<Tables<"categories">, "id" | "name" | "type">;
	images: {
		id: string;
		image_url: string | null;
	}[];
};

const BUCKET_NAME = "galleries";

export async function getAllGalleries(): Promise<
	SuccessResponseWithData<Gallery[]>
> {
	const { data, error } = await supabase.from("galleries").select(
		`
      id,
      title,
      description,
      activity_date,
      category:categories(id, name, type),
      images:gallery_images(id, image_path)
		`,
	);

	if (error) throw new Error("Gagal mengambil data galeri.");

	const galleries: Gallery[] = data?.map((gallery: GalleryDB) => ({
		...gallery,
		images: gallery.images.map((image) => ({
			id: image.id,
			image_url: getPublicImageUrl(BUCKET_NAME, image.image_path),
		})),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: galleries,
	};
}

export const getGalleryDetailById = async (
	id: string,
): Promise<SuccessResponseWithData<Gallery>> => {
	const { data, error } = await supabase
		.from("galleries")
		.select(
			`
        id,
        title,
        description,
        activity_date,
        category:categories(id, name, type),
        images:gallery_images(id, image_path)
			`,
		)
		.eq("id", id)
		.single();

	if (error) {
		throw new Error("Gagal mengambil data galeri.");
	}

	const images: Gallery["images"] = data.images.map((image) => ({
		id: image.id,
		image_url: getPublicImageUrl(BUCKET_NAME, image.image_path),
	}));

	return {
		success: true,
		message: "Data diambil dengan sukses.",
		data: {
			id: data.id,
			title: data.title,
			description: data.description,
			activity_date: data.activity_date,
			category: data.category,
			images,
		},
	};
};
