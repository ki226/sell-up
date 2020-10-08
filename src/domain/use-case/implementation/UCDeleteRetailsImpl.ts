import { injectable, inject } from "inversify";
import { UCDeleteRetails } from "../index";
import * as Entity from "../../entity";
import { TasksFilterRepository } from "../../interactor/repository";

@injectable()
export default class UCDeleteRetailsImpl implements UCDeleteRetails {
  private filterRepository: TasksFilterRepository;

  constructor(
    @inject("TasksFilterRepository") filterRepository: TasksFilterRepository
  ) {
    this.filterRepository = filterRepository;
  }

  execute(deleteRetail: string): Promise<Entity.Filter> {
    return this.filterRepository.deleteRetails(deleteRetail);
  }
}
