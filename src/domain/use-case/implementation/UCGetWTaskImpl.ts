import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetWTask } from "../index";
import { WholesaleRepository } from "../../interactor/repository";

@injectable()
export default class UCGetWTaskImpl implements UCGetWTask {
  private wholesaleRepository: WholesaleRepository;

  constructor(
    @inject("WholesaleRepository") wholesaleRepository: WholesaleRepository
  ) {
    this.wholesaleRepository = wholesaleRepository;
  }

  execute(wholesaleId: string): Promise<Entity.Wholesale> {
    return this.wholesaleRepository.getWTask(wholesaleId);
  }
}
