import { injectable, inject } from "inversify";
import { UCSaveFilter } from "../index";
import * as Entity from "../../entity";
import { TasksFilterRepository } from "../../interactor/repository";

@injectable()
export default class UCSaveFilterImpl implements UCSaveFilter {
  private filterRepository: TasksFilterRepository;
  constructor(
    @inject("TasksFilterRepository") filterRepository: TasksFilterRepository
  ) {
    this.filterRepository = filterRepository;
  }
  execute(filter: Entity.Filter): Promise<void> {
    return this.filterRepository.saveFilter(filter);
  }
}
