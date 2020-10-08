import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetWholesaleByTasks } from "../index";
import { WholesaleRepository } from "../../interactor/repository";

@injectable()
export default class UCGetWholesaleByTasksImpl
  implements UCGetWholesaleByTasks {
  private wholesaleRepository: WholesaleRepository;

  constructor(
    @inject("WholesaleRepository") wholesaleRepository: WholesaleRepository
  ) {
    this.wholesaleRepository = wholesaleRepository;
  }

  execute(tasks: Entity.Wholesale): Promise<Entity.Wholesale[]> {
    return this.wholesaleRepository.getWholesaleByTasks(Object.keys(tasks));
  }
}
