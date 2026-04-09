export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          display_name: string | null
          first_name: string | null
          id: string
          last_interaction_at: string | null
          phone_digits: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_interaction_at?: string | null
          phone_digits: string
          phone_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_interaction_at?: string | null
          phone_digits?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          bot_enabled: boolean
          bot_state: Json | null
          contact_id: string
          created_at: string
          handoff: boolean
          human_active: boolean
          id: string
          last_interaction_at: string | null
          last_quote_data: Json | null
          status: string
          store_unit_id: string | null
          updated_at: string
          whatsapp_channel_id: string
        }
        Insert: {
          bot_enabled?: boolean
          bot_state?: Json | null
          contact_id: string
          created_at?: string
          handoff?: boolean
          human_active?: boolean
          id?: string
          last_interaction_at?: string | null
          last_quote_data?: Json | null
          status?: string
          store_unit_id?: string | null
          updated_at?: string
          whatsapp_channel_id: string
        }
        Update: {
          bot_enabled?: boolean
          bot_state?: Json | null
          contact_id?: string
          created_at?: string
          handoff?: boolean
          human_active?: boolean
          id?: string
          last_interaction_at?: string | null
          last_quote_data?: Json | null
          status?: string
          store_unit_id?: string | null
          updated_at?: string
          whatsapp_channel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_whatsapp_channel_id_fkey"
            columns: ["whatsapp_channel_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_channels"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_outlets_raw: {
        Row: {
          erp_outlet_id: string
          id: string
          ingested_at: string
          name: string
          source_payload: Json
          sync_run_id: string | null
        }
        Insert: {
          erp_outlet_id: string
          id?: string
          ingested_at?: string
          name: string
          source_payload: Json
          sync_run_id?: string | null
        }
        Update: {
          erp_outlet_id?: string
          id?: string
          ingested_at?: string
          name?: string
          source_payload?: Json
          sync_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_outlets_raw_sync_run_id_fkey"
            columns: ["sync_run_id"]
            isOneToOne: false
            referencedRelation: "erp_sync_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_price_book_products_raw: {
        Row: {
          erp_price_book_id: string
          erp_price_book_product_id: string
          erp_product_id: string
          id: string
          ingested_at: string
          price: number | null
          source_payload: Json
          sync_run_id: string | null
          updated_at_erp: string | null
        }
        Insert: {
          erp_price_book_id: string
          erp_price_book_product_id: string
          erp_product_id: string
          id?: string
          ingested_at?: string
          price?: number | null
          source_payload: Json
          sync_run_id?: string | null
          updated_at_erp?: string | null
        }
        Update: {
          erp_price_book_id?: string
          erp_price_book_product_id?: string
          erp_product_id?: string
          id?: string
          ingested_at?: string
          price?: number | null
          source_payload?: Json
          sync_run_id?: string | null
          updated_at_erp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_price_book_products_raw_sync_run_id_fkey"
            columns: ["sync_run_id"]
            isOneToOne: false
            referencedRelation: "erp_sync_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_price_books_raw: {
        Row: {
          erp_price_book_id: string
          id: string
          ingested_at: string
          name: string | null
          source_payload: Json
          sync_run_id: string | null
        }
        Insert: {
          erp_price_book_id: string
          id?: string
          ingested_at?: string
          name?: string | null
          source_payload: Json
          sync_run_id?: string | null
        }
        Update: {
          erp_price_book_id?: string
          id?: string
          ingested_at?: string
          name?: string | null
          source_payload?: Json
          sync_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_price_books_raw_sync_run_id_fkey"
            columns: ["sync_run_id"]
            isOneToOne: false
            referencedRelation: "erp_sync_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_products_raw: {
        Row: {
          active: boolean | null
          deleted_at: string | null
          erp_product_id: string
          handle: string | null
          id: string
          ingested_at: string
          name: string
          sku: string | null
          source_payload: Json
          sync_run_id: string | null
          updated_at_erp: string | null
          variant_name: string | null
        }
        Insert: {
          active?: boolean | null
          deleted_at?: string | null
          erp_product_id: string
          handle?: string | null
          id?: string
          ingested_at?: string
          name: string
          sku?: string | null
          source_payload: Json
          sync_run_id?: string | null
          updated_at_erp?: string | null
          variant_name?: string | null
        }
        Update: {
          active?: boolean | null
          deleted_at?: string | null
          erp_product_id?: string
          handle?: string | null
          id?: string
          ingested_at?: string
          name?: string
          sku?: string | null
          source_payload?: Json
          sync_run_id?: string | null
          updated_at_erp?: string | null
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_products_raw_sync_run_id_fkey"
            columns: ["sync_run_id"]
            isOneToOne: false
            referencedRelation: "erp_sync_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_sync_runs: {
        Row: {
          error_text: string | null
          finished_at: string | null
          id: string
          meta: Json
          source: string
          started_at: string
          status: string
          sync_type: string
        }
        Insert: {
          error_text?: string | null
          finished_at?: string | null
          id?: string
          meta?: Json
          source?: string
          started_at?: string
          status: string
          sync_type: string
        }
        Update: {
          error_text?: string | null
          finished_at?: string | null
          id?: string
          meta?: Json
          source?: string
          started_at?: string
          status?: string
          sync_type?: string
        }
        Relationships: []
      }
      erp_tags_raw: {
        Row: {
          deleted_at: string | null
          erp_tag_id: string
          id: string
          ingested_at: string
          name: string
          source_payload: Json
          sync_run_id: string | null
        }
        Insert: {
          deleted_at?: string | null
          erp_tag_id: string
          id?: string
          ingested_at?: string
          name: string
          source_payload: Json
          sync_run_id?: string | null
        }
        Update: {
          deleted_at?: string | null
          erp_tag_id?: string
          id?: string
          ingested_at?: string
          name?: string
          source_payload?: Json
          sync_run_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_tags_raw_sync_run_id_fkey"
            columns: ["sync_run_id"]
            isOneToOne: false
            referencedRelation: "erp_sync_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          contact_id: string | null
          content_raw: Json | null
          content_text: string | null
          conversation_id: string
          created_at: string
          direction: string
          external_message_id: string | null
          id: string
          message_type: string
          received_at: string | null
          sender_type: string
          sent_at: string | null
          updated_at: string
        }
        Insert: {
          contact_id?: string | null
          content_raw?: Json | null
          content_text?: string | null
          conversation_id: string
          created_at?: string
          direction: string
          external_message_id?: string | null
          id?: string
          message_type?: string
          received_at?: string | null
          sender_type: string
          sent_at?: string | null
          updated_at?: string
        }
        Update: {
          contact_id?: string | null
          content_raw?: Json | null
          content_text?: string | null
          conversation_id?: string
          created_at?: string
          direction?: string
          external_message_id?: string | null
          id?: string
          message_type?: string
          received_at?: string | null
          sender_type?: string
          sent_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      service_pricing: {
        Row: {
          active: boolean
          created_at: string | null
          erp_product_id: string | null
          final_price: number
          id: string
          labor_price: number
          model: string | null
          model_display: string | null
          service_group: string
          service_name: string
          service_price: number
          service_sku: string | null
          synced_at: string | null
          updated_at: string | null
          variant: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          erp_product_id?: string | null
          final_price: number
          id?: string
          labor_price?: number
          model?: string | null
          model_display?: string | null
          service_group: string
          service_name: string
          service_price: number
          service_sku?: string | null
          synced_at?: string | null
          updated_at?: string | null
          variant?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          erp_product_id?: string | null
          final_price?: number
          id?: string
          labor_price?: number
          model?: string | null
          model_display?: string | null
          service_group?: string
          service_name?: string
          service_price?: number
          service_sku?: string | null
          synced_at?: string | null
          updated_at?: string | null
          variant?: string | null
        }
        Relationships: []
      }
      store_units: {
        Row: {
          active: boolean
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          created_at: string
          erp_outlet_id: string | null
          id: string
          monday_friday_close: string | null
          monday_friday_open: string | null
          name: string
          neighborhood: string | null
          postal_code: string | null
          saturday_close: string | null
          saturday_closed: boolean
          saturday_open: string | null
          slug: string
          source_notes: string | null
          source_url: string | null
          state: string | null
          unit_type: string
          updated_at: string
          whatsapp_number: string | null
        }
        Insert: {
          active?: boolean
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          created_at?: string
          erp_outlet_id?: string | null
          id?: string
          monday_friday_close?: string | null
          monday_friday_open?: string | null
          name: string
          neighborhood?: string | null
          postal_code?: string | null
          saturday_close?: string | null
          saturday_closed?: boolean
          saturday_open?: string | null
          slug: string
          source_notes?: string | null
          source_url?: string | null
          state?: string | null
          unit_type: string
          updated_at?: string
          whatsapp_number?: string | null
        }
        Update: {
          active?: boolean
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          created_at?: string
          erp_outlet_id?: string | null
          id?: string
          monday_friday_close?: string | null
          monday_friday_open?: string | null
          name?: string
          neighborhood?: string | null
          postal_code?: string | null
          saturday_close?: string | null
          saturday_closed?: boolean
          saturday_open?: string | null
          slug?: string
          source_notes?: string | null
          source_url?: string | null
          state?: string | null
          unit_type?: string
          updated_at?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      whatsapp_channels: {
        Row: {
          channel_name: string
          created_at: string
          evolution_instance_name: string | null
          id: string
          is_active: boolean
          is_test_channel: boolean
          phone_digits: string | null
          phone_number: string | null
          store_unit_id: string | null
          updated_at: string
        }
        Insert: {
          channel_name: string
          created_at?: string
          evolution_instance_name?: string | null
          id?: string
          is_active?: boolean
          is_test_channel?: boolean
          phone_digits?: string | null
          phone_number?: string | null
          store_unit_id?: string | null
          updated_at?: string
        }
        Update: {
          channel_name?: string
          created_at?: string
          evolution_instance_name?: string | null
          id?: string
          is_active?: boolean
          is_test_channel?: boolean
          phone_digits?: string | null
          phone_number?: string | null
          store_unit_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
