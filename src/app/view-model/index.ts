import {
  CertResponse,
  User,
  Retailer,
  Task,
  Wholesale,
  Building,
  Filter,
  TaskType,
  StateStatus,
  Week,
  WholesaleContact,
} from "../../domain/entity";

export interface SignUpViewModel {
  //통신 비동기로 promise형태로 return값 설정(통신결과값) User라는 객체를 받아온다
  getCertResponse(): Promise<CertResponse>;
  createUser(userData: User): Promise<User>;
}

export interface LogInViewModel {
  matchUser(logInData: User): Promise<User>;
}

export interface FilterViewModel {
  getTasks(): Promise<Task[]>;
  getRetailsByIds(taskData: Task[]): Promise<Retailer[]>;
  getWholesalesByIds(taskData: Task[]): Promise<Wholesale[]>;
  getBuildingsByIds(wholesales: Wholesale[]): Promise<Building[]>;
  saveFilter(filter: Filter): Promise<void>;
  getFilter(): Promise<Filter>;
  getTypes(): Promise<TaskType[]>;
}

export interface WTaskViewModel {
  getFilter(): Promise<Filter>;
  getTasksByWholesaler(filter: Filter, wholesaleId: string): Promise<Task[]>;
  getTasksByRetailer(
    tasks: Task[],
    wholesaleId: string
  ): Promise<{
    [key: string]: Task[];
  }>;
  getWTask(wholesaleId: string): Promise<Wholesale>;
  getRetailsByIds(taskData: Task[]): Promise<Retailer[]>;
  getTotalPrice(tasks: {
    [key: string]: Task[];
  }): Promise<{ [key: string]: number }>;
}

export interface ProductDetailViewModel {
  getTaskDetail(taskId: string): Promise<Task>;
  getStatus(task: Task): Promise<StateStatus>;
  saveTaskInfo(
    // price: number,
    quantity: string,
    status: string,
    taskId: string,
    memo: string,
    prepaidQuantity: number
  ): Promise<void>;
  getDate(): Promise<Week[]>;
}

export interface TaskListViewModel {
  getTasksByFilter(filter: Filter): Promise<Task[]>;
  getFilter(): Promise<Filter>;
  getWholesaleByTasks(tasks: Task[]): Promise<Wholesale[]>;
  getRetailByTasks(tasks: Task[]): Promise<Retailer[]>;
  getBuildingsByWholesale(wholesale: Wholesale[]): Promise<Building>;
  deleteBuildings(deleteBuilding: string): Promise<Filter>;
  deleteRetails(deleteRetail: string): Promise<Filter>;
}
