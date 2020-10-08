import { inject, injectable } from "inversify";
import { TaskListViewModel } from "..";
import {
  UCGetTasksByFilter,
  UCGetFilter,
  UCGetWholesaleByTasks,
  UCGetRetailByTasks,
  UCGetBuildingsByWhole,
  UCDeleteBuildings,
  UCDeleteRetails,
} from "../../../domain/use-case";
import {
  Filter,
  Wholesale,
  Retailer,
  Building,
  Task,
} from "../../../domain/entity";

@injectable()
export default class TaskListViewModelImpl implements TaskListViewModel {
  private ucGetTasksByFilter: UCGetTasksByFilter;
  private ucGetFilter: UCGetFilter;
  private ucGetWholesaleByTasks: UCGetWholesaleByTasks;
  private ucGetRetailByTasks: UCGetRetailByTasks;
  private ucGetBuildingsByWhole: UCGetBuildingsByWhole;
  private ucDeleteBuildings: UCDeleteBuildings;
  private ucDeleteRetails: UCDeleteRetails;

  constructor(
    @inject("UCGetTasksByFilter") ucGetTasksByFilter: UCGetTasksByFilter,
    @inject("UCGetFilter") ucGetFilter: UCGetFilter,
    @inject("UCGetWholesaleByTasks")
    ucGetWholesaleByTasks: UCGetWholesaleByTasks,

    @inject("UCGetRetailByTasks")
    ucGetRetailByTasks: UCGetRetailByTasks,
    @inject("UCGetBuildingsByWhole")
    ucGetBuildingsByWhole: UCGetBuildingsByWhole,
    @inject("UCDeleteBuildings") ucDeleteBuildings: UCDeleteBuildings,
    @inject("UCDeleteRetails") ucDeleteRetails: UCDeleteRetails
  ) {
    this.ucGetTasksByFilter = ucGetTasksByFilter;
    this.ucGetFilter = ucGetFilter;
    this.ucGetWholesaleByTasks = ucGetWholesaleByTasks;
    this.ucGetRetailByTasks = ucGetRetailByTasks;
    this.ucGetBuildingsByWhole = ucGetBuildingsByWhole;
    this.ucDeleteBuildings = ucDeleteBuildings;
    this.ucDeleteRetails = ucDeleteRetails;
  }

  getFilter(): Promise<Filter> {
    return this.ucGetFilter.execute();
  }

  getTasksByFilter(filter: Filter): Promise<Task[]> {
    return this.ucGetTasksByFilter.execute(filter);
  }

  getWholesaleByTasks(tasks: Task[]): Promise<Wholesale[]> {
    return this.ucGetWholesaleByTasks.execute(tasks);
  }

  getRetailByTasks(tasks: Task[]): Promise<Retailer[]> {
    return this.ucGetRetailByTasks.execute(tasks);
  }

  getBuildingsByWholesale(wholesale: Wholesale[]): Promise<Building> {
    return this.ucGetBuildingsByWhole.execute(wholesale);
  }

  deleteBuildings(deleteBuilding: string): Promise<Filter> {
    return this.ucDeleteBuildings.execute(deleteBuilding);
  }

  deleteRetails(deleteRetail: string): Promise<Filter> {
    return this.ucDeleteRetails.execute(deleteRetail);
  }
}
