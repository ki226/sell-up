import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetRetailByTasks } from "../index";
import { RetailRepository } from "../../interactor/repository";

@injectable()
export default class UCGetRetailByTasksImpl implements UCGetRetailByTasks {
  private retailRepository: RetailRepository;

  constructor(@inject("RetailRepository") retailRepository: RetailRepository) {
    this.retailRepository = retailRepository;
  }

  execute(tasks: Entity.Task[]): Promise<{ [key: string]: string[] }> {
    let retailIdObj: { [key: string]: string[] } = {};
    Object.keys(tasks).forEach((wholesaleId: string) => {
      let retailIds: string[] = [];
      tasks[wholesaleId].map((task: Entity.Task) => {
        retailIds.push(task.retailer);
      });
      retailIdObj[wholesaleId] = retailIds;
    });
    return this.retailRepository.getRetailByTasks(retailIdObj);
  }
}
