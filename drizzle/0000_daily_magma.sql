CREATE TABLE "notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"type" varchar(100) NOT NULL,
	"title" text,
	"content" text,
	"external_owner_id" text NOT NULL,
	"status" "status",
	"created_at" timestamp DEFAULT now(),
	"readed_at" timestamp
);
