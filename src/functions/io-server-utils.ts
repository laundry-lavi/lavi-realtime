import { DefaultEventsMap, RemoteSocket } from "socket.io";
import { app } from "../server";

export enum IoServerStatus {
  OK,
  NOT_FOUND,
  ERROR,
}

type IoServerResponse<T> = {
  timestamp: Date;
  data?: T;
  status: IoServerStatus;
  err?: Error;
  $metadata?: any;
}

export const EmitToOne = async (id: string, body: any): Promise<IoServerResponse<undefined>> => {
  const allSockets = await app.io.fetchSockets();

  for(const socket of allSockets) {
    if (socket.id == id || socket.data.id == id) {
      socket.emit("privateNotification", body);
      return {
        timestamp: new Date(),
        $metadata: {
          request: { data: body, id },
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
          request: {
            id
          },
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

export const EmitToAll = async (event: string, data: any): 
  Promise<IoServerResponse<undefined>> => {
  try {
    app.io.emit(event, data);
    return {
      status: IoServerStatus.OK,
      timestamp: new Date(),
      $metadata: {
        request: {
          event,
          data
        }
      }
    }
  } catch (error) {
    return {
      timestamp: new Date(),
      status: IoServerStatus.ERROR,
      $metadata: {
        request: {
          event,
          data
        }
      },
      err: error as Error
    }
  }
}