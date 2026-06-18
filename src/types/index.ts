export interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  location: string | null;
  year: number | null;
  image_url: string | null;
  image_key: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Review {
  id: string;
  project_id: string | null;
  author_name: string;
  company: string | null;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
  // Optional join (Projekt-Titel) fuer die Anzeige
  project?: Pick<Project, "id" | "title"> | null;
}

export type SettingKey =
  | "hero_title"
  | "hero_subtitle"
  | "hero_image"
  | "contact_phone"
  | "contact_email"
  | "contact_address"
  | "stats_projects"
  | "stats_years"
  | "stats_satisfaction"
  | "stats_sectors";

export interface SiteSetting {
  key: string;
  value: string;
}

export type SiteSettings = Record<string, string>;

// Eingaben fuer das oeffentliche Bewertungsformular
export interface ReviewInput {
  project_id: string;
  author_name: string;
  company?: string;
  email: string;
  rating: number;
  comment: string;
}

// Minimaler Supabase-Datenbanktyp fuer Typsicherheit der Clients
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Partial<Project> & Pick<Project, "title" | "category">;
        Update: Partial<Project>;
        Relationships: [];
      };
      reviews: {
        Row: Review;
        Insert: ReviewInput & { approved?: boolean };
        Update: Partial<Review>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSetting;
        Update: Partial<SiteSetting>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
