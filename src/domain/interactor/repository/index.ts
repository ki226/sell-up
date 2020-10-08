import * as Entity from "../../entity";

export interface CertResponseRepository {
  getCertResponse(): Promise<Entity.CertResponse>;
}

export interface SignUpRepository {
  createUser(userData: Entity.User): Promise<Entity.User>;
  matchUser(logInData: Entity.User): Promise<Entity.User>;
}

export interface BuildingRepository {
  getBuildingsByIds(ids: string[]): Promise<Entity.Building[]>;
  getBuildingsByWholesale(
    wholesale: Entity.Wholesale[]
  ): Promise<Entity.Building[]>;
}

export interface RetailRepository {
  getRetailsByIds(ids: string[]): Promise<Entity.Retailer[]>;
  getRetailByTasks(retailIds: {
    [key: string]: string[];
  }): Promise<{ [key: string]: string[] }>;
}

export interface WholesaleRepository {
  getWholesalesByIds(ids: string[]): Promise<Entity.Wholesale[]>;
  getWTask(wholesaleId: string): Promise<Entity.Wholesale>;
  getWholesaleByTasks(
    wholesaleIds: Entity.Wholesale
  ): Promise<Entity.Wholesale[]>;
}

export interface OrderRepository {
  getOrders(): Promise<Entity.Order[]>;
}

export interface TaskRepository {
  getTasks(): Promise<Entity.Task[]>;
  getTasksByWholesaler(
    filter: Entity.Filter,
    wholesaleId: string
  ): Promise<Entity.Task[]>;
  getTasksByRetailer(
    retailIds: string[],
    wholesaleId: string
  ): Promise<Entity.Retailer[]>;
  getTotalPrice(tasks: {
    [key: string]: Entity.Task;
  }): Promise<{ [key: string]: number }>;
  getTaskDetail(taskId: string): Promise<Entity.Task>;
  getTasksByFilter(
    retailIds: string[],
    types: Entity.TaskType[]
  ): Promise<Entity.Task[]>;
  saveTaskInfo(
    // price: number,
    quantity: string,
    status: string,
    taskId: string,
    memo: string,
    prepaidQuantity: number
  ): Promise<void>;
}

export interface TasksFilterRepository {
  saveFilter(filter: Entity.Filter): Promise<void>;
  getFilter(): Promise<Entity.Filter>;
  deleteBuildings(deleteBuilding: string): Promise<Entity.Filter>;
  deleteRetails(deleteRetail: string): Promise<Entity.Filter>;
}
