import { NotificationModel } from "../entities";

export interface INotificationRepository {
  insert(data: NotificationModel): Promise<void>;
  selectByOwner(id: string): Promise<NotificationModel[]>;
  updateStatus(id: string, new_status: string): Promise<void>;
  filterByType(id: string, type: string): Promise<NotificationModel[]>;
}
