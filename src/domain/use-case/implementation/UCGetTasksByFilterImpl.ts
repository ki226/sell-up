import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTasksByFilter } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTasksByFilterImpl implements UCGetTasksByFilter {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(filter: Entity.Filter): Promise<Entity.Task[]> {
    return this.taskRepository.getTasksByFilter(
      filter.retail.map((retailer) => retailer.id),
      filter.type
    );
  }
}
