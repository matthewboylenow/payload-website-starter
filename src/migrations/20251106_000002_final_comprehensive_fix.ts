import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Add missing hero_height column to pages table
  await db.execute(sql`
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_height" varchar DEFAULT 'medium';
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_height" varchar DEFAULT 'medium';
  `)

  // 2. Create Settings global tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "default_font" varchar DEFAULT 'geist-sans',
      "heading_font" varchar DEFAULT 'geist-sans',
      "default_text_color" varchar DEFAULT 'foreground',
      "default_heading_color" varchar DEFAULT 'foreground',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "settings_custom_google_fonts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "slug" varchar,
      "weights" varchar DEFAULT '400,700'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "settings_custom_colors" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "slug" varchar,
      "value" varchar
    );
  `)

  // 3. Create Blocks collection tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "description" varchar,
      "category" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Create blocks nested block tables for each block type
  // CTA Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_cta_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "rich_text" jsonb,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Content Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_content_columns" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "size" varchar DEFAULT 'oneThird',
      "rich_text" jsonb,
      "enable_link" boolean,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Media Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_media_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Archive Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "intro_content" jsonb,
      "populate_by" varchar DEFAULT 'collection',
      "relation_to" varchar DEFAULT 'posts',
      "limit" numeric DEFAULT 10,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Form Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "form_id" integer,
      "enable_intro" boolean,
      "intro_content" jsonb,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Video Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_video" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "video_type" varchar DEFAULT 'embed',
      "embed_u_r_l" varchar,
      "video_file_id" integer,
      "caption" jsonb,
      "aspect_ratio" varchar DEFAULT '16/9',
      "autoplay" boolean DEFAULT false,
      "loop" boolean DEFAULT false,
      "muted" boolean DEFAULT false,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Testimonials Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_testimonials_testimonials" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar,
      "author" varchar,
      "role" varchar,
      "company" varchar,
      "avatar_id" integer,
      "rating" numeric
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_testimonials" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "intro_content" jsonb,
      "layout" varchar DEFAULT 'grid',
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // TabsAccordion Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_tabs_accordion_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "content" jsonb
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_tabs_accordion" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "display_mode" varchar DEFAULT 'tabs',
      "default_open" numeric DEFAULT 0,
      "allow_multiple" boolean DEFAULT false,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Stats Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "description" varchar,
      "icon" varchar DEFAULT 'none',
      "animate" boolean DEFAULT true
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "intro_content" jsonb,
      "layout" varchar DEFAULT 'grid',
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Timeline Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_timeline_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "date" varchar,
      "title" varchar,
      "description" jsonb,
      "image_id" integer,
      "icon" varchar DEFAULT 'check'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_timeline" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "intro_content" jsonb,
      "layout" varchar DEFAULT 'vertical',
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Banner Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "style" varchar DEFAULT 'info',
      "content" jsonb,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Code Block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_block_code" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "language" varchar DEFAULT 'typescript',
      "code" varchar,
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar DEFAULT 'medium',
      "spacing_padding_bottom" varchar DEFAULT 'medium',
      "visibility_hidden" boolean DEFAULT false,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_heading_font" varchar DEFAULT 'default',
      "typography_text_color" varchar DEFAULT 'default',
      "typography_heading_color" varchar DEFAULT 'default',
      "custom_c_s_s" varchar
    );
  `)

  // Create blocks_rels for relationships
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer,
      "categories_id" integer
    );
  `)

  // Create indexes for settings tables
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_custom_google_fonts_order_idx" ON "settings_custom_google_fonts" ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_custom_google_fonts_parent_id_idx" ON "settings_custom_google_fonts" ("_parent_id");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_custom_colors_order_idx" ON "settings_custom_colors" ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_custom_colors_parent_id_idx" ON "settings_custom_colors" ("_parent_id");
  `)

  // Add foreign key constraints for settings
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "settings_custom_google_fonts" ADD CONSTRAINT "settings_custom_google_fonts_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "settings_custom_colors" ADD CONSTRAINT "settings_custom_colors_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove hero_height column from pages
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_height";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_height";
  `)

  // Drop Settings tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "settings_custom_google_fonts";
    DROP TABLE IF EXISTS "settings_custom_colors";
    DROP TABLE IF EXISTS "settings";
  `)

  // Drop Blocks tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "blocks_block_cta_links";
    DROP TABLE IF EXISTS "blocks_block_cta";
    DROP TABLE IF EXISTS "blocks_block_content_columns";
    DROP TABLE IF EXISTS "blocks_block_content";
    DROP TABLE IF EXISTS "blocks_block_media_block";
    DROP TABLE IF EXISTS "blocks_block_archive";
    DROP TABLE IF EXISTS "blocks_block_form_block";
    DROP TABLE IF EXISTS "blocks_block_video";
    DROP TABLE IF EXISTS "blocks_block_testimonials_testimonials";
    DROP TABLE IF EXISTS "blocks_block_testimonials";
    DROP TABLE IF EXISTS "blocks_block_tabs_accordion_items";
    DROP TABLE IF EXISTS "blocks_block_tabs_accordion";
    DROP TABLE IF EXISTS "blocks_block_stats_stats";
    DROP TABLE IF EXISTS "blocks_block_stats";
    DROP TABLE IF EXISTS "blocks_block_timeline_items";
    DROP TABLE IF EXISTS "blocks_block_timeline";
    DROP TABLE IF EXISTS "blocks_block_banner";
    DROP TABLE IF EXISTS "blocks_block_code";
    DROP TABLE IF EXISTS "blocks_rels";
    DROP TABLE IF EXISTS "blocks";
  `)
}
