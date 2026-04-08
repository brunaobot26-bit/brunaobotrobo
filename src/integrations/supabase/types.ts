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
      catalog_item_components: {
        Row: {
          component_catalog_item_id: string
          component_role: string
          id: string
          quantity: number
          service_catalog_item_id: string
        }
        Insert: {
          component_catalog_item_id: string
          component_role: string
          id?: string
          quantity?: number
          service_catalog_item_id: string
        }
        Update: {
          component_catalog_item_id?: string
          component_role?: string
          id?: string
          quantity?: number
          service_catalog_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_item_components_component_catalog_item_id_fkey"
            columns: ["component_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_item_components_component_catalog_item_id_fkey"
            columns: ["component_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["labor_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_components_component_catalog_item_id_fkey"
            columns: ["component_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["part_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_components_component_catalog_item_id_fkey"
            columns: ["component_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["service_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_components_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_item_components_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["labor_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_components_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["part_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_components_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["service_catalog_item_id"]
          },
        ]
      }
      catalog_item_device_models: {
        Row: {
          catalog_item_id: string
          device_model_id: string
          id: string
        }
        Insert: {
          catalog_item_id: string
          device_model_id: string
          id?: string
        }
        Update: {
          catalog_item_id?: string
          device_model_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "catalog_item_device_models_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_item_device_models_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["labor_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_device_models_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["part_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_device_models_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["service_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_device_models_device_model_id_fkey"
            columns: ["device_model_id"]
            isOneToOne: false
            referencedRelation: "device_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_item_device_models_device_model_id_fkey"
            columns: ["device_model_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["device_model_id"]
          },
        ]
      }
      catalog_item_external_refs: {
        Row: {
          catalog_item_id: string
          external_id: string
          external_sku: string | null
          external_source: string
          id: string
          raw_name: string | null
          raw_variant_name: string | null
        }
        Insert: {
          catalog_item_id: string
          external_id: string
          external_sku?: string | null
          external_source?: string
          id?: string
          raw_name?: string | null
          raw_variant_name?: string | null
        }
        Update: {
          catalog_item_id?: string
          external_id?: string
          external_sku?: string | null
          external_source?: string
          id?: string
          raw_name?: string | null
          raw_variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_item_external_refs_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "catalog_item_external_refs_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["labor_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_external_refs_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["part_catalog_item_id"]
          },
          {
            foreignKeyName: "catalog_item_external_refs_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["service_catalog_item_id"]
          },
        ]
      }
      catalog_items: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          display_name: string
          id: string
          item_kind: string
          normalized_name: string
          updated_at: string
          variant: string | null
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          display_name: string
          id?: string
          item_kind: string
          normalized_name: string
          updated_at?: string
          variant?: string | null
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          display_name?: string
          id?: string
          item_kind?: string
          normalized_name?: string
          updated_at?: string
          variant?: string | null
        }
        Relationships: []
      }
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
      device_models: {
        Row: {
          active: boolean
          brand: string
          created_at: string
          family: string | null
          id: string
          model_name: string
          normalized_name: string
        }
        Insert: {
          active?: boolean
          brand?: string
          created_at?: string
          family?: string | null
          id?: string
          model_name: string
          normalized_name: string
        }
        Update: {
          active?: boolean
          brand?: string
          created_at?: string
          family?: string | null
          id?: string
          model_name?: string
          normalized_name?: string
        }
        Relationships: []
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
      pricing_rules: {
        Row: {
          active: boolean
          id: string
          notes: string | null
          price_book_id: string | null
          service_catalog_item_id: string
          store_unit_id: string | null
        }
        Insert: {
          active?: boolean
          id?: string
          notes?: string | null
          price_book_id?: string | null
          service_catalog_item_id: string
          store_unit_id?: string | null
        }
        Update: {
          active?: boolean
          id?: string
          notes?: string | null
          price_book_id?: string | null
          service_catalog_item_id?: string
          store_unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_rules_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pricing_rules_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["labor_catalog_item_id"]
          },
          {
            foreignKeyName: "pricing_rules_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["part_catalog_item_id"]
          },
          {
            foreignKeyName: "pricing_rules_service_catalog_item_id_fkey"
            columns: ["service_catalog_item_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["service_catalog_item_id"]
          },
          {
            foreignKeyName: "pricing_rules_store_unit_id_fkey"
            columns: ["store_unit_id"]
            isOneToOne: false
            referencedRelation: "resolved_pricing"
            referencedColumns: ["store_unit_id"]
          },
          {
            foreignKeyName: "pricing_rules_store_unit_id_fkey"
            columns: ["store_unit_id"]
            isOneToOne: false
            referencedRelation: "store_units"
            referencedColumns: ["id"]
          },
        ]
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
      resolved_pricing: {
        Row: {
          category: string | null
          device_model_id: string | null
          labor_catalog_item_id: string | null
          labor_name: string | null
          labor_price: number | null
          last_erp_update: string | null
          model_name: string | null
          part_catalog_item_id: string | null
          part_name: string | null
          part_price: number | null
          resolved_price: number | null
          service_catalog_item_id: string | null
          service_name: string | null
          store_unit_id: string | null
          store_unit_name: string | null
          variant: string | null
        }
        Relationships: []
      }
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
