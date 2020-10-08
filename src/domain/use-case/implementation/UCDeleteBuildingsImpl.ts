import { injectable, inject } from "inversify";
import { UCDeleteBuildings } from "../index";
import * as Entity from "../../entity";
import { TasksFilterRepository } from "../../interactor/repository";

@injectable()
export default class UCDeleteBuildingsImpl implements UCDeleteBuildings {
  private filterRepository: TasksFilterRepository;

  constructor(
    @inject("TasksFilterRepository") filterRepository: TasksFilterRepository
  ) {
    this.filterRepository = filterRepository;
  }

  execute(deleteBuilding: string): Promise<Entity.Filter> {
    return this.filterRepository.deleteBuildings(deleteBuilding);
  }
}
