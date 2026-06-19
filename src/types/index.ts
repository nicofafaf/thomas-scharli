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

export type ServiceType =
  | "Zweiradtransport"
  | "Umzug"
  | "Netzmontage"
  | "Fahrzeugtransport"
  | "Sonstiges";

export interface Review {
  id: string;
  project_id: string | null;
  author_name: string;
  company: string | null;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  service_type: ServiceType | null;
  would_recommend: boolean;
  helpful_count?: number;
  created_at: string;
  // Optional join (Projekt-Titel) fuer die Anzeige
  project?: Pick<Project, "id" | "title" | "category"> | null;
}

export interface ReviewVote {
  id: string;
  review_id: string;
  voter_fp: string;
  created_at: string;
}

export interface ReviewStats {
  averageRating: number;
  totalCount: number;
  distribution: { stars: number; count: number; percent: number }[];
  recommendPercent: number;
  byServiceType: { service: string; count: number }[];
}

export type InquiryServiceType =
  | "Zweiradtransport"
  | "Umzug"
  | "Fahrzeugtransport"
  | "Spezialtransport"
  | "Netzmontage"
  | "Sonstiges";

export type InquiryStatus = "neu" | "gesehen" | "erledigt";

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_type: InquiryServiceType;
  from_location: string | null;
  to_location: string | null;
  date_wished: string | null;
  message: string | null;
  status: InquiryStatus;
  created_at: string;
}

export interface InquiryInput {
  name: string;
  phone: string;
  email?: string;
  service_type: InquiryServiceType;
  from_location?: string;
  to_location?: string;
  date_wished?: string;
  message?: string;
}

export type SettingKey =
  | "hero_title"
  | "hero_subtitle"
  | "hero_image"
  | "contact_phone"
  | "contact_email"
  | "contact_address"
  | "stats_reviews"
  | "stats_rating"
  | "stats_satisfaction"
  | "stats_cities";

export interface SiteSetting {
  key: string;
  value: string;
}

export type SiteSettings = Record<string, string>;

// Eingaben fuer das oeffentliche Bewertungsformular
export interface ReviewInput {
  project_id?: string | null;
  author_name: string;
  company?: string | null;
  email: string;
  rating: number;
  comment: string;
  service_type: ServiceType;
  would_recommend?: boolean;
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
      inquiries: {
        Row: Inquiry;
        Insert: InquiryInput & { status?: InquiryStatus };
        Update: Partial<Inquiry>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
