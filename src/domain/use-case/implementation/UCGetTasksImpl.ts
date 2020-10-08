import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTasks } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTasksImpl implements UCGetTasks {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(): Promise<Entity.Task[]> {
    return this.taskRepository.getTasks();
  }
}
