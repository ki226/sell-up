import { inject, injectable } from "inversify";
import { WTaskViewModel } from "../index";
import {
  UCGetFilter,
  UCGetTasksByWholesaler,
  UCGetTasksByRetailer,
  UCGetWTask,
  UCGetRetails,
  UCGetTotalPrice,
} from "../../../domain/use-case";
import {
  Filter,
  Task,
  Wholesale,
  Retailer,
  TaskType,
} from "../../../domain/entity";

@injectable()
export default class WTaskViewModelImpl implements WTaskViewModel {
  private ucGetFilter: UCGetFilter;
  private ucGetTasksByWholesaler: UCGetTasksByWholesaler;
  private ucGetTasksByRetailer: UCGetTasksByRetailer;
  private ucGetWTask: UCGetWTask;
  private ucGetRetails: UCGetRetails;
  private ucGetTotalPrice: UCGetTotalPrice;

  constructor(
    @inject("UCGetFilter") ucGetFilter: UCGetFilter,
    @inject("UCGetTasksByWholesaler")
    ucGetTasksByWholesaler: UCGetTasksByWholesaler,
    @inject("UCGetTasksByRetailer") ucGetTasksByRetailer: UCGetTasksByRetailer,
    @inject("UCGetWTask") ucGetWTask: UCGetWTask,
    @inject("UCGetRetails") ucGetRetails: UCGetRetails,
    @inject("UCGetTotalPrice") ucGetTotalPrice: UCGetTotalPrice
  ) {
    this.ucGetFilter = ucGetFilter;
    this.ucGetTasksByWholesaler = ucGetTasksByWholesaler;
    this.ucGetTasksByRetailer = ucGetTasksByRetailer;
    this.ucGetWTask = ucGetWTask;
    this.ucGetRetails = ucGetRetails;
    this.ucGetTotalPrice = ucGetTotalPrice;
  }

  getFilter(): Promise<Filter> {
    return this.ucGetFilter.execute();
  }

  getTasksByWholesaler(filter: Filter, wholesaleId: string): Promise<Task[]> {
    return this.ucGetTasksByWholesaler.execute(filter, wholesaleId);
  }

  getTasksByRetailer(
    tasks: Task[],
    wholesaleId: string
  ): Promise<{
    [key: string]: Task[];
  }> {
    return this.ucGetTasksByRetailer.execute(tasks, wholesaleId);
  }

  getWTask(wholesaleId: string): Promise<Wholesale> {
    return this.ucGetWTask.execute(wholesaleId);
  }

  getRetailsByIds(taskData: Task[]): Promise<Retailer[]> {
    return this.ucGetRetails.execute(taskData);
  }

  getTotalPrice(tasks: {
    [key: string]: Task[];
  }): Promise<{ [key: string]: number }> {
    return this.ucGetTotalPrice.execute(tasks);
  }
}
