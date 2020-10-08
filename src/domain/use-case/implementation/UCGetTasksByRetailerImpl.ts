import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTasksByRetailer } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTasksByRetailerImpl implements UCGetTasksByRetailer {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(
    tasks: Entity.Task[],
    wholesaleId: string
  ): Promise<Entity.Retailer[]> {
    return this.taskRepository.getTasksByRetailer(
      tasks.map((task) => task.retailer),
      wholesaleId
    );
  }
}
