import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add text_alignment column to all block tables
  await db.execute(sql`
    ALTER TABLE "blocks_cta"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_columns"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_content"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_media_block"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_archive"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_form_block"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_video"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_testimonials"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_tabs_accordion"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_stats"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_timeline"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_banner"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_code"
    ADD COLUMN IF NOT EXISTS "text_alignment" varchar DEFAULT 'left';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove text_alignment column from all block tables
  await db.execute(sql`
    ALTER TABLE "blocks_cta"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_columns"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_content"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_media_block"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_archive"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_form_block"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_video"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_testimonials"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_tabs_accordion"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_stats"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_timeline"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_banner"
    DROP COLUMN IF EXISTS "text_alignment";
  `)

  await db.execute(sql`
    ALTER TABLE "blocks_code"
    DROP COLUMN IF EXISTS "text_alignment";
  `)
}
