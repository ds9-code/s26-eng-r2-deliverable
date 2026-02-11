export type Database = {
  public: {
    Tables: {
      species: {
        Row: {
          id: string;
          created_at: string;
          scientific_name: string;
          common_name: string | null;
          kingdom: string;
          total_population: number | null;
          description: string | null;
          image: string | null;
          author: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          scientific_name: string;
          common_name?: string | null;
          kingdom: string;
          total_population?: number | null;
          description?: string | null;
          image?: string | null;
          author?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          scientific_name?: string;
          common_name?: string | null;
          kingdom?: string;
          total_population?: number | null;
          description?: string | null;
          image?: string | null;
          author?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          biography: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          biography?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          biography?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
