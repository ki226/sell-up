import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetWholesales } from "../index";
import { WholesaleRepository } from "../../interactor/repository";

@injectable()
export default class UCGetWholesalesImpl implements UCGetWholesales {
  private wholesaleRepository: WholesaleRepository;

  constructor(
    @inject("WholesaleRepository") wholesaleRepository: WholesaleRepository
  ) {
    this.wholesaleRepository = wholesaleRepository;
  }

  execute(taskData: Entity.Task[]): Promise<Entity.Wholesale[]> {
    return this.wholesaleRepository.getWholesalesByIds(
      taskData.map((task) => task.wholesaler)
    );
  }
}
