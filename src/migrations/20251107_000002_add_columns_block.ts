import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create blocks_columns table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY,
      "layout" varchar DEFAULT '50-50' NOT NULL,
      "reverse_on_mobile" boolean DEFAULT false,
      "gap" varchar DEFAULT 'medium',
      "block_anchor" varchar,
      "background_color" varchar DEFAULT 'none',
      "spacing_padding_top" varchar,
      "spacing_padding_bottom" varchar,
      "text_alignment" varchar DEFAULT 'left',
      "visibility_hidden" boolean,
      "visibility_publish_date" timestamp(3) with time zone,
      "visibility_expiry_date" timestamp(3) with time zone,
      "animation" varchar DEFAULT 'none',
      "typography_font_family" varchar,
      "typography_heading_font" varchar,
      "typography_text_color" varchar,
      "typography_heading_color" varchar,
      "custom_css" varchar,
      "block_name" varchar
    );
  `)

  // Create blocks_columns_columns table for the array field
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blocks_columns_columns" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY,
      "content_type" varchar DEFAULT 'richText' NOT NULL,
      "rich_text" jsonb,
      "media_id" integer,
      "caption" varchar,
      "video_type" varchar DEFAULT 'youtube',
      "video_url" varchar,
      "video_upload_id" integer,
      "code" varchar,
      "language" varchar DEFAULT 'typescript',
      "custom_html" text,
      "cta_text" varchar,
      "link_type" varchar,
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL DEFAULT '',
      "link_appearance" varchar,
      "vertical_alignment" varchar DEFAULT 'top',
      "text_align" varchar DEFAULT 'left',
      "padding" varchar DEFAULT 'medium'
    );
  `)

  // Add foreign key constraints
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blocks_columns"
      ADD CONSTRAINT "blocks_columns_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blocks_columns_columns"
      ADD CONSTRAINT "blocks_columns_columns_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blocks_columns_columns"
      ADD CONSTRAINT "blocks_columns_columns_media_id_fk"
      FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blocks_columns_columns"
      ADD CONSTRAINT "blocks_columns_columns_video_upload_id_fk"
      FOREIGN KEY ("video_upload_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_order_idx"
    ON "blocks_columns" ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_parent_id_idx"
    ON "blocks_columns" ("_parent_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_path_idx"
    ON "blocks_columns" ("_path");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_columns_order_idx"
    ON "blocks_columns_columns" ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_columns_parent_id_idx"
    ON "blocks_columns_columns" ("_parent_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_columns_media_id_idx"
    ON "blocks_columns_columns" ("media_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blocks_columns_columns_video_upload_id_idx"
    ON "blocks_columns_columns" ("video_upload_id");
  `)

  // Add link_reference relationship to pages_rels and posts_rels
  await db.execute(sql`
    ALTER TABLE "pages_rels"
    ADD COLUMN IF NOT EXISTS "blocks_columns_columns_id" varchar;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_rels"
      ADD CONSTRAINT "pages_rels_blocks_columns_columns_fk"
      FOREIGN KEY ("blocks_columns_columns_id") REFERENCES "blocks_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "pages_rels_blocks_columns_columns_id_idx"
    ON "pages_rels" ("blocks_columns_columns_id");
  `)

  await db.execute(sql`
    ALTER TABLE "posts_rels"
    ADD COLUMN IF NOT EXISTS "blocks_columns_columns_id" varchar;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "posts_rels"
      ADD CONSTRAINT "posts_rels_blocks_columns_columns_fk"
      FOREIGN KEY ("blocks_columns_columns_id") REFERENCES "blocks_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "posts_rels_blocks_columns_columns_id_idx"
    ON "posts_rels" ("blocks_columns_columns_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove columns from relationship tables
  await db.execute(sql`
    ALTER TABLE "pages_rels"
    DROP COLUMN IF EXISTS "blocks_columns_columns_id";
  `)

  await db.execute(sql`
    ALTER TABLE "posts_rels"
    DROP COLUMN IF EXISTS "blocks_columns_columns_id";
  `)

  // Drop tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "blocks_columns_columns";
  `)

  await db.execute(sql`
    DROP TABLE IF EXISTS "blocks_columns";
  `)
}
