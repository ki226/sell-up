import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetTotalPrice } from "../index";
import { TaskRepository } from "../../interactor/repository";

@injectable()
export default class UCGetTotalPriceImpl implements UCGetTotalPrice {
  private taskRepository: TaskRepository;

  constructor(@inject("TaskRepository") taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(tasks: {
    [key: string]: Entity.Task;
  }): Promise<{ [key: string]: number }> {
    let priceObj: { [key: string]: number } = {};
    Object.keys(tasks).forEach((retailId: string) => {
      if (tasks[retailId].length === 1) {
        priceObj[retailId] =
          tasks[retailId][0].productPrice *
          tasks[retailId][0].requestedQuantity;
      } else {
        tasks[retailId].reduce((task1: Entity.Task, task2: Entity.Task) => {
          priceObj[retailId] =
            task1.productPrice * task1.requestedQuantity +
            task2.productPrice * task2.requestedQuantity;
        });
      }
    });
    return this.taskRepository.getTotalPrice(priceObj);
  }
}
