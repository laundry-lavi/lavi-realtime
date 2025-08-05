import { INotification } from "../models/notification";

export interface INotificationRepository {
  insert(data: INotification): Promise<void>;
  selectByOwner(id: string): Promise<INotification[]>;
  updateStatus(id: string, new_status: string): Promise<void>;
  filterByType(id: string, type: string): Promise<INotification[]>;
}
