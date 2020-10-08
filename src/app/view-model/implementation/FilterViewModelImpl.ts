import { inject, injectable } from "inversify";
import { FilterViewModel } from "..";
import {
  UCGetTasks,
  UCGetRetails,
  UCGetWholesales,
  UCGetBuildings,
  UCGetFilter,
  UCSaveFilter,
} from "../../../domain/use-case";
import {
  Task,
  Retailer,
  Wholesale,
  Building,
  Filter,
  TaskType,
} from "../../../domain/entity";

@injectable()
export default class FilterViewModelImpl implements FilterViewModel {
  private ucGetTasks: UCGetTasks;
  private ucGetRetails: UCGetRetails;
  private ucGetWholesales: UCGetWholesales;
  private ucGetBuildings: UCGetBuildings;
  private ucGetFilter: UCGetFilter;
  private ucSaveFilter: UCSaveFilter;

  constructor(
    @inject("UCGetTasks") ucGetTasks: UCGetTasks,
    @inject("UCGetRetails") ucGetRetails: UCGetRetails,
    @inject("UCGetWholesales") ucGetWholesales: UCGetWholesales,
    @inject("UCGetBuildings") ucGetBuildings: UCGetBuildings,
    @inject("UCGetFilter") ucGetFilter: UCGetFilter,
    @inject("UCSaveFilter") ucSaveFilter: UCSaveFilter
  ) {
    this.ucGetTasks = ucGetTasks;
    this.ucGetRetails = ucGetRetails;
    this.ucGetWholesales = ucGetWholesales;
    this.ucGetBuildings = ucGetBuildings;
    this.ucGetFilter = ucGetFilter;
    this.ucSaveFilter = ucSaveFilter;
  }

  getTasks(): Promise<Task[]> {
    return this.ucGetTasks.execute();
  }

  getRetailsByIds(taskData: Task[]): Promise<Retailer[]> {
    return this.ucGetRetails.execute(taskData);
  }

  getWholesalesByIds(taskData: Task[]): Promise<Wholesale[]> {
    return this.ucGetWholesales.execute(taskData);
  }

  getBuildingsByIds(wholesales: Wholesale[]): Promise<Building[]> {
    return this.ucGetBuildings.execute(wholesales);
  }

  getTypes(): Promise<TaskType[]> {
    let arr: TaskType[] = Object.keys(TaskType)
      .filter((k) => typeof TaskType[k] !== "number")
      .map((k) => {
        return TaskType[k];
      });
    return Promise.resolve(arr);
  }

  saveFilter(filter: Filter): Promise<void> {
    return this.ucSaveFilter.execute(filter);
  }

  getFilter(): Promise<Filter> {
    return this.ucGetFilter.execute();
  }
}
