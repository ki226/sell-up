import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetRetails } from "../index";
import { RetailRepository } from "../../interactor/repository";

@injectable()
export default class UCGetRetailsImpl implements UCGetRetails {
  private retailRepository: RetailRepository;
  constructor(@inject("RetailRepository") retailRepository: RetailRepository) {
    this.retailRepository = retailRepository;
  }

  execute(taskData: Entity.Task[]): Promise<Entity.Retailer[]> {
    return this.retailRepository.getRetailsByIds(
      taskData.map((task) => task.retailer)
    );
  }
}
