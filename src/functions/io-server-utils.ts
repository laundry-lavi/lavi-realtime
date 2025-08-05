import { DefaultEventsMap, RemoteSocket } from "socket.io";
import { app } from "../server";

export enum IoServerStatus {
  OK,
  NOT_FOUND,
  ERROR,
}

type IoServerResponse<T> = {
  timestamp: Date;
  data?: any | T;
  status: IoServerStatus;
  err?: Error;
  $metadata?: any;
}

type SocketId = {
  socketId: string;
}

export const EmitToOneSocket = async (id: string, body: any): Promise<IoServerResponse<undefined>> => {
  const allSockets = await app.io.fetchSockets();

  for(const socket of allSockets) {
    if (socket.id == id || socket.data.id == id) {
      socket.emit("privateNotification", body);
      return {
        timestamp: new Date(),
        $metadata: {
          requestData: body,
          socketId: socket.id
        },
        status: IoServerStatus.OK
      }
    }
  }

  return {
    timestamp: new Date(),
    status: IoServerStatus.NOT_FOUND
  }
}


export const FindSocketById = async (id: string): 
  Promise<IoServerResponse<RemoteSocket<DefaultEventsMap, any>>> => {
  const allSockets = await app.io.fetchSockets();

  for (const socket of allSockets) {
    if (socket.id == id || socket.data.id == id) {
      return {
        timestamp: new Date(),
        data: socket,
        $metadata: {
          requestData: {
            id
          }
        },
        status: IoServerStatus.OK
      }
    }
  }

  return {
    timestamp: new Date(),
    status: IoServerStatus.NOT_FOUND
  }
}