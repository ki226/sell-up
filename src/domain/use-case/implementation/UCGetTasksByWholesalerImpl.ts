import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTasksByWholesaler } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTasksByWholesalerImpl
  implements UCGetTasksByWholesaler {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(filter: Entity.Filter, wholesaleId: string): Promise<Entity.Task[]> {
    return this.taskRepository.getTasksByWholesaler(
      filter.retail.map((retail: string) => retail.id),
      wholesaleId
    );
  }
}
