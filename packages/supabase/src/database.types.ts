export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "14.1";
	};
	public: {
		Tables: {
			categories: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					type: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					type: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					type?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			collaborations: {
				Row: {
					category_id: string;
					created_at: string;
					description: string;
					id: string;
					logo_path: string | null;
					partner_name: string;
					period_id: string;
					updated_at: string;
				};
				Insert: {
					category_id: string;
					created_at?: string;
					description: string;
					id?: string;
					logo_path?: string | null;
					partner_name: string;
					period_id: string;
					updated_at?: string;
				};
				Update: {
					category_id?: string;
					created_at?: string;
					description?: string;
					id?: string;
					logo_path?: string | null;
					partner_name?: string;
					period_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "collaborations_category_id_fkey";
						columns: ["category_id"];
						isOneToOne: false;
						referencedRelation: "categories";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "collaborations_period_id_fkey";
						columns: ["period_id"];
						isOneToOne: false;
						referencedRelation: "periods";
						referencedColumns: ["id"];
					},
				];
			};
			galleries: {
				Row: {
					activity_date: string;
					category_id: string;
					created_at: string;
					description: string;
					id: string;
					slug: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					activity_date: string;
					category_id: string;
					created_at?: string;
					description: string;
					id?: string;
					slug: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					activity_date?: string;
					category_id?: string;
					created_at?: string;
					description?: string;
					id?: string;
					slug?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "galleries_category_id_fkey";
						columns: ["category_id"];
						isOneToOne: false;
						referencedRelation: "categories";
						referencedColumns: ["id"];
					},
				];
			};
			gallery_images: {
				Row: {
					created_at: string;
					gallery_id: string;
					id: string;
					image_path: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					gallery_id: string;
					id?: string;
					image_path?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					gallery_id?: string;
					id?: string;
					image_path?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "gallery_images_gallery_id_fkey";
						columns: ["gallery_id"];
						isOneToOne: false;
						referencedRelation: "galleries";
						referencedColumns: ["id"];
					},
				];
			};
			news: {
				Row: {
					category_id: string;
					content: string;
					created_at: string;
					excerpt: string;
					id: string;
					image_path: string | null;
					is_published: boolean;
					published_at: string | null;
					slug: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					category_id: string;
					content: string;
					created_at?: string;
					excerpt: string;
					id?: string;
					image_path?: string | null;
					is_published?: boolean;
					published_at?: string | null;
					slug: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					category_id?: string;
					content?: string;
					created_at?: string;
					excerpt?: string;
					id?: string;
					image_path?: string | null;
					is_published?: boolean;
					published_at?: string | null;
					slug?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "news_category_id_fkey";
						columns: ["category_id"];
						isOneToOne: false;
						referencedRelation: "categories";
						referencedColumns: ["id"];
					},
				];
			};
			organization_members: {
				Row: {
					created_at: string;
					id: string;
					name: string;
					period_id: string;
					photo_path: string | null;
					position_id: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					name: string;
					period_id: string;
					photo_path?: string | null;
					position_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					name?: string;
					period_id?: string;
					photo_path?: string | null;
					position_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "organization_members_period_id_fkey";
						columns: ["period_id"];
						isOneToOne: false;
						referencedRelation: "periods";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "organization_members_position_id_fkey";
						columns: ["position_id"];
						isOneToOne: false;
						referencedRelation: "positions";
						referencedColumns: ["id"];
					},
				];
			};
			periods: {
				Row: {
					created_at: string;
					end_year: number;
					id: string;
					is_active: boolean;
					name: string;
					start_year: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					end_year: number;
					id?: string;
					is_active?: boolean;
					name: string;
					start_year: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					end_year?: number;
					id?: string;
					is_active?: boolean;
					name?: string;
					start_year?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			positions: {
				Row: {
					created_at: string;
					description: string;
					id: string;
					is_active: boolean;
					name: string;
					sort_order: number;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					description: string;
					id?: string;
					is_active?: boolean;
					name: string;
					sort_order?: number;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					description?: string;
					id?: string;
					is_active?: boolean;
					name?: string;
					sort_order?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					created_at: string;
					email: string;
					id: string;
					role: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					email: string;
					id?: string;
					role: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					email?: string;
					id?: string;
					role?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			programs: {
				Row: {
					category_id: string;
					created_at: string;
					description: string;
					id: string;
					is_active: boolean;
					schedule_type: string;
					status: string;
					title: string;
					updated_at: string;
				};
				Insert: {
					category_id: string;
					created_at?: string;
					description: string;
					id?: string;
					is_active?: boolean;
					schedule_type: string;
					status: string;
					title: string;
					updated_at?: string;
				};
				Update: {
					category_id?: string;
					created_at?: string;
					description?: string;
					id?: string;
					is_active?: boolean;
					schedule_type?: string;
					status?: string;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "programs_category_id_fkey";
						columns: ["category_id"];
						isOneToOne: false;
						referencedRelation: "categories";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			is_admin: { Args: never; Returns: boolean };
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
