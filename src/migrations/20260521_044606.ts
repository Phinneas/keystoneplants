import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`nurseries_specialties\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`nurseries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nurseries_specialties_order_idx\` ON \`nurseries_specialties\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`nurseries_specialties_parent_idx\` ON \`nurseries_specialties\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nurseries_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nurseries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nurseries_photos_order_idx\` ON \`nurseries_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nurseries_photos_parent_id_idx\` ON \`nurseries_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nurseries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`address\` text,
  	\`city\` text NOT NULL,
  	\`state\` text NOT NULL,
  	\`zip\` text NOT NULL,
  	\`website\` text,
  	\`phone\` text,
  	\`is_native_only\` integer DEFAULT false,
  	\`lat\` numeric,
  	\`lng\` numeric,
  	\`verified\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nurseries_slug_idx\` ON \`nurseries\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`nurseries_state_idx\` ON \`nurseries\` (\`state\`);`)
  await db.run(sql`CREATE INDEX \`nurseries_updated_at_idx\` ON \`nurseries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`nurseries_created_at_idx\` ON \`nurseries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`plants_native_regions\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`plants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plants_native_regions_order_idx\` ON \`plants_native_regions\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`plants_native_regions_parent_idx\` ON \`plants_native_regions\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`plants_wildlife_value\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`plants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plants_wildlife_value_order_idx\` ON \`plants_wildlife_value\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`plants_wildlife_value_parent_idx\` ON \`plants_wildlife_value\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`plants_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plants_photos_order_idx\` ON \`plants_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plants_photos_parent_id_idx\` ON \`plants_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`plants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`common_name\` text NOT NULL,
  	\`scientific_name\` text NOT NULL,
  	\`description\` text,
  	\`plant_type\` text,
  	\`hardiness_zone_min\` numeric,
  	\`hardiness_zone_max\` numeric,
  	\`height_in_feet_min\` numeric,
  	\`height_in_feet_max\` numeric,
  	\`sun_requirement\` text,
  	\`moisture_requirement\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`plants_slug_idx\` ON \`plants\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`plants_updated_at_idx\` ON \`plants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`plants_created_at_idx\` ON \`plants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`body\` text NOT NULL,
  	\`published_at\` text,
  	\`cover_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_at_idx\` ON \`posts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_cover_image_idx\` ON \`posts\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`zip_regions_ecoregions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`zip_regions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`zip_regions_ecoregions_order_idx\` ON \`zip_regions_ecoregions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`zip_regions_ecoregions_parent_id_idx\` ON \`zip_regions_ecoregions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`zip_regions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`zip\` text NOT NULL,
  	\`state\` text NOT NULL,
  	\`hardiness_zone\` numeric,
  	\`lat\` numeric,
  	\`lng\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`zip_regions_zip_idx\` ON \`zip_regions\` (\`zip\`);`)
  await db.run(sql`CREATE INDEX \`zip_regions_state_idx\` ON \`zip_regions\` (\`state\`);`)
  await db.run(sql`CREATE INDEX \`zip_regions_updated_at_idx\` ON \`zip_regions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`zip_regions_created_at_idx\` ON \`zip_regions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`nurseries_id\` integer REFERENCES nurseries(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`plants_id\` integer REFERENCES plants(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`zip_regions_id\` integer REFERENCES zip_regions(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_nurseries_id_idx\` ON \`payload_locked_documents_rels\` (\`nurseries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_plants_id_idx\` ON \`payload_locked_documents_rels\` (\`plants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_zip_regions_id_idx\` ON \`payload_locked_documents_rels\` (\`zip_regions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`nurseries_specialties\`;`)
  await db.run(sql`DROP TABLE \`nurseries_photos\`;`)
  await db.run(sql`DROP TABLE \`nurseries\`;`)
  await db.run(sql`DROP TABLE \`plants_native_regions\`;`)
  await db.run(sql`DROP TABLE \`plants_wildlife_value\`;`)
  await db.run(sql`DROP TABLE \`plants_photos\`;`)
  await db.run(sql`DROP TABLE \`plants\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`zip_regions_ecoregions\`;`)
  await db.run(sql`DROP TABLE \`zip_regions\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
}
