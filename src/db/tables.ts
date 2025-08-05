import { text, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

//const statusEnum = pgEnum("statusEnum", ["READED", "DELIVERED", "WAITING"]);

export const notificationsTable = pgTable("notifications", {
  id: text().primaryKey(),
  type: varchar({ length: 100 }).notNull(),
  title: text(),
  content: text(),
  external_owner_id: text().notNull(),
  //status: statusEnum(),
  status: text().default("WAITING"),
  created_at: timestamp().defaultNow(),
  readed_at: timestamp(),
});
