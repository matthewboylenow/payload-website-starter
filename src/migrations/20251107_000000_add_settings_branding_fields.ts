import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add new columns to settings table
  await db.execute(sql`
    ALTER TABLE "settings"
    ADD COLUMN IF NOT EXISTS "logo_id" integer,
    ADD COLUMN IF NOT EXISTS "primary_brand_color" varchar,
    ADD COLUMN IF NOT EXISTS "secondary_brand_color" varchar,
    ADD COLUMN IF NOT EXISTS "accent_color" varchar,
    ADD COLUMN IF NOT EXISTS "background_color" varchar;
  `)

  // Add foreign key constraint for logo_id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "settings"
      ADD CONSTRAINT "settings_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create index for logo_id
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_logo_idx"
    ON "settings" ("logo_id");
  `)

  // Create settings_extracted_palette table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "settings_extracted_palette" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "color_name" varchar,
      "hex" varchar NOT NULL,
      "usage" varchar
    );
  `)

  // Add foreign key constraint for _parent_id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "settings_extracted_palette"
      ADD CONSTRAINT "settings_extracted_palette_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create indexes for settings_extracted_palette
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_extracted_palette_order_idx"
    ON "settings_extracted_palette" ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "settings_extracted_palette_parent_id_idx"
    ON "settings_extracted_palette" ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Drop settings_extracted_palette table
  await db.execute(sql`
    DROP TABLE IF EXISTS "settings_extracted_palette";
  `)

  // Remove columns from settings table
  await db.execute(sql`
    ALTER TABLE "settings"
    DROP COLUMN IF EXISTS "logo_id",
    DROP COLUMN IF EXISTS "primary_brand_color",
    DROP COLUMN IF EXISTS "secondary_brand_color",
    DROP COLUMN IF EXISTS "accent_color",
    DROP COLUMN IF EXISTS "background_color";
  `)
}
