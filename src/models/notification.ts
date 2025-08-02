import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  id: string;
  type: string;
  created_at: Date;
  readed_at: Date;
  status: string;
  owner_id: string;
}

const notificationSchema = new Schema<INotification>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  readed_at: Date,
  status: {
    type: String,
    required: true,
    default: "WAITING",
  },
  owner_id: {
    type: String,
    required: true,
  },
});

export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
