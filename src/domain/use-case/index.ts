import * as Entity from "../entity";

export interface UCGetCertResponse {
  execute(): Promise<Entity.CertResponse>;
}

export interface UCCreateUser {
  execute(userData: Entity.User): Promise<Entity.User>;
}

export interface UCMatchUser {
  execute(logInData: Entity.User): Promise<Entity.User>;
}

export interface UCGetBuildings {
  execute(wholesales: Entity.Wholesale[]): Promise<Entity.Building[]>;
}

export interface UCGetRetails {
  execute(taskData: Entity.Task[]): Promise<Entity.Retailer[]>;
}

export interface UCGetWholesales {
  execute(taskData: Entity.Task[]): Promise<Entity.Wholesale[]>;
}

export interface UCGetOrders {
  execute(): Promise<Entity.Order[]>;
}

export interface UCGetTasks {
  execute(): Promise<Entity.Task[]>;
}

export interface UCGetTasksByWholesaler {
  execute(filter: Entity.Filter, wholesaleId: string): Promise<Entity.Task[]>;
}

export interface UCGetTasksByRetailer {
  execute(
    tasks: Entity.Task[],
    wholesaleId: string
  ): Promise<Entity.Retailer[]>;
}

export interface UCGetFilter {
  execute(): Promise<Entity.Filter>;
}

export interface UCSaveFilter {
  execute(filter: Entity.Filter): Promise<void>;
}

export interface UCGetWTask {
  execute(wholesaleId: string): Promise<Entity.Wholesale>;
}

export interface UCGetTotalPrice {
  execute(tasks: {
    [key: string]: Entity.Task;
  }): Promise<{ [key: string]: number }>;
}

export interface UCGetTaskDetail {
  execute(taskId: string): Promise<Entity.Task>;
}

export interface UCSaveTaskInfo {
  execute(
    // price: number,
    quantity: number,
    status: string,
    taskId: string,
    memo: string,
    prepaidQunatity: number
  ): Promise<void>;
}

export interface UCGetTasksByFilter {
  execute(filter: Entity.Filter): Promise<Entity.Task[]>;
}

export interface UCGetWholesaleByTasks {
  execute(tasks: Entity.Task[]): Promise<Entity.Wholesale[]>;
}

export interface UCGetRetailByTasks {
  execute(tasks: Entity.Task[]): Promise<Entity.Retailer[]>;
}

export interface UCGetBuildingsByWhole {
  execute(wholesale: Entity.Wholesale[]): Promise<Entity.Building>;
}

export interface UCDeleteBuildings {
  execute(deleteBuilding: string): Promise<Entity.Filter>;
}

export interface UCDeleteRetails {
  execute(deleteRetail: string): Promise<Entity.Filter>;
}
