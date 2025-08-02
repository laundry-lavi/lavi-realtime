import { INotificationRepository } from ".";
import { INotification, NotificationModel } from "../models/notification";

export class NotificationRepository implements INotificationRepository {
  public async insert(data: INotification): Promise<void> {
    await NotificationModel.create(data);
  }

  public async selectByOwner(id: string): Promise<INotification[]> {
    const result: INotification[] = await NotificationModel.find({
      owner_id: id,
    });

    return result;
  }

  public async updateStatus(id: string, new_status: string): Promise<void> {
    await NotificationModel.findOneAndUpdate({ id }, { status: new_status });
  }

  public async filterByType(
    id: string,
    type: string
  ): Promise<INotification[]> {
    const result: INotification[] = await NotificationModel.find({
      owner_id: id,
      type: type,
    });

    return result;
  }
}
