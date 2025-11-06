import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add blocks_id column to payload_locked_documents_rels table
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "blocks_id" integer;
  `)

  // Add foreign key constraint for blocks_id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_blocks_fk"
      FOREIGN KEY ("blocks_id") REFERENCES "blocks"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create index for blocks_id
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blocks_id_idx"
    ON "payload_locked_documents_rels" ("blocks_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove blocks_id column from payload_locked_documents_rels
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "blocks_id";
  `)
}
