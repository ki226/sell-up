import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetBuildings } from "../index";
import { BuildingRepository } from "../../interactor/repository";

@injectable()
export default class UCGetBuildingsImpl implements UCGetBuildings {
  private buildingRepository: BuildingRepository;

  constructor(
    @inject("BuildingRepository") buildingRepository: BuildingRepository
  ) {
    this.buildingRepository = buildingRepository;
  }

  execute(wholesales: Entity.Wholesale[]): Promise<Entity.Building[]> {
    return this.buildingRepository.getBuildingsByIds(
      wholesales.map((wholesale) => wholesale.address.building.id)
    );
  }
}
