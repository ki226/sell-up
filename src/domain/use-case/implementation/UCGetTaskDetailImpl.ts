import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTaskDetail } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTaskDetailImpl implements UCGetTaskDetail {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(taskId: string): Promise<Entity.Task> {
    return this.taskRepository.getTaskDetail(taskId);
  }
}
