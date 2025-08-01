import { and, eq } from "drizzle-orm";
import { INotificationRepository } from ".";
import { db } from "../db/drizzle";
import { notificationsTable } from "../db/tables";
import { NotificationModel } from "../entities";
import { logger } from "../log/logger";

export class NotificationRepository implements INotificationRepository {
  public async insert(data: NotificationModel): Promise<void> {
    await db.insert(notificationsTable).values(data);
  }

  public async selectByOwner(id: string): Promise<NotificationModel[]> {
    const result = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.external_owner_id, id));

    return result;
  }

  public async updateStatus(id: string, new_status: string): Promise<void> {
    try {
      await db
        .update(notificationsTable)
        .set({ status: new_status })
        .where(eq(notificationsTable.external_owner_id, id));
    } catch (error) {
      logger.error(error);
    }
  }

  public async filterByType(
    id: string,
    type: string
  ): Promise<NotificationModel[]> {
    try {
      const result = await db
        .select()
        .from(notificationsTable)
        .where(
          and(
            eq(notificationsTable.external_owner_id, id),
            eq(notificationsTable.type, type)
          )
        );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
