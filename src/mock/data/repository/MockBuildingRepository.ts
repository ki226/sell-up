import { BuildingRepository } from "../../../domain/interactor/repository";
import * as Entity from "../../../domain/entity";
import { injectable } from "inversify";

@injectable()
export default class MockBuildingRepository implements BuildingRepository {
  buildings: Entity.Building[] = [
    {
      id: "bld000000",
      displayName: "디오트",
      fullName: "디오트",
      simpleName: "디",
    },
    {
      id: "bld000001",
      displayName: "청평화",
      fullName: "청평화",
      simpleName: "청",
    },
  ];

  getBuildingsByIds(ids: string[]): Promise<Entity.Building[]> {
    var buildings: Entity.Building[] = [];
    const filteredIds = ids.filter(
      (id: string, idx, arr) => arr.indexOf(id) === idx
    );
    filteredIds.forEach((id) => {
      this.buildings.forEach((building) => {
        if (id === building.id) {
          buildings.push(building);
        }
      });
    });
    return Promise.resolve(buildings);
  }

  getBuildingsByWholesale(
    wholesale: Entity.Wholesale[]
  ): Promise<Entity.Building[]> {
    let buildingObj = {};

    this.buildings.forEach((building) => {
      let wholesaleIds: string[] = [];
      wholesale.forEach((whole) => {
        if (whole.address.building.id === building.id) {
          wholesaleIds.push(whole.id);
        }
      });
      buildingObj[building.fullName] = wholesaleIds;
    });
    return Promise.resolve(buildingObj);
  }
}
