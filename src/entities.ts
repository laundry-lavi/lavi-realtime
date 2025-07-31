import { notificationsTable } from "./db/tables";

export type NotificationModel = typeof notificationsTable.$inferInsert;
