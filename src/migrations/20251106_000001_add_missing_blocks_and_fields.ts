import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add common block fields to existing block tables
  const existingBlockTables = [
    'pages_blocks_cta',
    'pages_blocks_content',
    'pages_blocks_media_block',
    'pages_blocks_archive',
    'pages_blocks_form_block',
    '_pages_v_blocks_cta',
    '_pages_v_blocks_content',
    '_pages_v_blocks_media_block',
    '_pages_v_blocks_archive',
    '_pages_v_blocks_form_block',
  ]

  for (const table of existingBlockTables) {
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "block_anchor" varchar`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "background_color" varchar DEFAULT 'none'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "spacing_padding_top" varchar DEFAULT 'medium'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "spacing_padding_bottom" varchar DEFAULT 'medium'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "visibility_hidden" boolean DEFAULT false`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "visibility_publish_date" timestamp(3) with time zone`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "visibility_expiry_date" timestamp(3) with time zone`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "animation" varchar DEFAULT 'none'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "typography_font_family" varchar DEFAULT 'default'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "typography_heading_font" varchar DEFAULT 'default'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "typography_text_color" varchar DEFAULT 'default'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "typography_heading_color" varchar DEFAULT 'default'`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} ADD COLUMN IF NOT EXISTS "custom_c_s_s" varchar`)
  }

  // Create video block table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_video" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_video" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create testimonials block tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials_testimonials" (
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
    CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials_testimonials" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar,
      "author" varchar,
      "role" varchar,
      "company" varchar,
      "avatar_id" integer,
      "rating" numeric,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create tabs/accordion block tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_tabs_accordion_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "content" jsonb
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_tabs_accordion" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tabs_accordion_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "content" jsonb,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tabs_accordion" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create stats block tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_stats_stats" (
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
    CREATE TABLE IF NOT EXISTS "pages_blocks_stats" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "label" varchar,
      "description" varchar,
      "icon" varchar DEFAULT 'none',
      "animate" boolean DEFAULT true,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_stats" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create timeline block tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_timeline_items" (
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
    CREATE TABLE IF NOT EXISTS "pages_blocks_timeline" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_timeline_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "date" varchar,
      "title" varchar,
      "description" jsonb,
      "image_id" integer,
      "icon" varchar DEFAULT 'check',
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_timeline" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create banner block table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_banner" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_banner" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // Create code block table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_code" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_code" (
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
      "custom_c_s_s" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove added columns from existing tables
  const existingBlockTables = [
    'pages_blocks_cta',
    'pages_blocks_content',
    'pages_blocks_media_block',
    'pages_blocks_archive',
    'pages_blocks_form_block',
    '_pages_v_blocks_cta',
    '_pages_v_blocks_content',
    '_pages_v_blocks_media_block',
    '_pages_v_blocks_archive',
    '_pages_v_blocks_form_block',
  ]

  for (const table of existingBlockTables) {
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "block_anchor"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "background_color"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "spacing_padding_top"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "spacing_padding_bottom"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "visibility_hidden"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "visibility_publish_date"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "visibility_expiry_date"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "animation"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "typography_font_family"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "typography_heading_font"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "typography_text_color"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "typography_heading_color"`)
    await db.execute(sql`ALTER TABLE ${sql.raw(`"${table}"`)} DROP COLUMN IF EXISTS "custom_c_s_s"`)
  }

  // Drop new block tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_video";
    DROP TABLE IF EXISTS "_pages_v_blocks_video";
    DROP TABLE IF EXISTS "pages_blocks_testimonials_testimonials";
    DROP TABLE IF EXISTS "pages_blocks_testimonials";
    DROP TABLE IF EXISTS "_pages_v_blocks_testimonials_testimonials";
    DROP TABLE IF EXISTS "_pages_v_blocks_testimonials";
    DROP TABLE IF EXISTS "pages_blocks_tabs_accordion_items";
    DROP TABLE IF EXISTS "pages_blocks_tabs_accordion";
    DROP TABLE IF EXISTS "_pages_v_blocks_tabs_accordion_items";
    DROP TABLE IF EXISTS "_pages_v_blocks_tabs_accordion";
    DROP TABLE IF EXISTS "pages_blocks_stats_stats";
    DROP TABLE IF EXISTS "pages_blocks_stats";
    DROP TABLE IF EXISTS "_pages_v_blocks_stats_stats";
    DROP TABLE IF EXISTS "_pages_v_blocks_stats";
    DROP TABLE IF EXISTS "pages_blocks_timeline_items";
    DROP TABLE IF EXISTS "pages_blocks_timeline";
    DROP TABLE IF EXISTS "_pages_v_blocks_timeline_items";
    DROP TABLE IF EXISTS "_pages_v_blocks_timeline";
    DROP TABLE IF EXISTS "pages_blocks_banner";
    DROP TABLE IF EXISTS "_pages_v_blocks_banner";
    DROP TABLE IF EXISTS "pages_blocks_code";
    DROP TABLE IF EXISTS "_pages_v_blocks_code";
  `)
}
