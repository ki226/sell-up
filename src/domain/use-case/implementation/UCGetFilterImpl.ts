import { injectable, inject } from "inversify";
import { UCGetFilter } from "../index";
import * as Entity from "../../entity";
import { TasksFilterRepository } from "../../interactor/repository";

@injectable()
export default class UCGetFilterImpl implements UCGetFilter {
  private filterRepository: TasksFilterRepository;
  constructor(
    @inject("TasksFilterRepository") filterRepository: TasksFilterRepository
  ) {
    this.filterRepository = filterRepository;
  }
  execute(): Promise<Entity.Filter> {
    return this.filterRepository.getFilter();
  }
}
