import { notificationsTable } from "./db/tables";

type NotificationModel = typeof notificationsTable.$inferInsert;
