import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetBuildingsByWhole } from "../index";
import { BuildingRepository } from "../../interactor/repository";

@injectable()
export default class UCGetBuildingsByWholeImpl
  implements UCGetBuildingsByWhole {
  private buildingRepository: BuildingRepository;

  constructor(
    @inject("BuildingRepository") buildingRepository: BuildingRepository
  ) {
    this.buildingRepository = buildingRepository;
  }

  execute(wholesale: Entity.Wholesale[]): Promise<Entity.Building[]> {
    return this.buildingRepository.getBuildingsByWholesale(wholesale);
  }
}
