import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCSaveTaskInfo } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCSaveTaskInfoImpl implements UCSaveTaskInfo {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(
    // price: number,
    quantity: string,
    status: string,
    taskId: string,
    memo: string,
    prepaidQuantity: number
  ): Promise<void> {
    return this.taskRepository.saveTaskInfo(
      // price,
      quantity,
      status,
      taskId,
      memo,
      prepaidQuantity
    );
  }
}
