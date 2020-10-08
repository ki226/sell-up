import { injectable } from "inversify";
import * as Entity from "../../../domain/entity";
import { TasksFilterRepository } from "../../../domain/interactor/repository";

//   필터 업뎃, 초기화, 가져오기 함수 만들기'
//   테스크, 홀세일 페이지에서 사용
//   데이터를 모든 공간에서 사용

@injectable()
export default class MockTasksFilterRepository
  implements TasksFilterRepository {
  filter: Entity.Filter = {
    retail: [
      {
        id: "rtl000000",
        name: "테스트1",
        format: {
          id: 0,
          formatItems: [
            {
              id: 0,
              name: "공급처명",
              type: "WholesalerName",
              ordinal: 0,
            },
            {
              id: 1,
              name: "공급처주소",
              type: "WholesalerAddress",
              ordinal: 1,
            },
          ],
        },
        status: 1,
      },

      {
        id: "rtl000001",
        name: "테스트12",
        format: {
          id: 0,
          formatItems: [
            {
              id: 0,
              name: "공급처명",
              type: "WholesalerName",
              ordinal: 0,
            },
            {
              id: 1,
              name: "공급처주소",
              type: "WholesalerAddress",
              ordinal: 1,
            },
          ],
        },
        status: 1,
      },
      {
        id: "rtl000002",
        name: "테스트2",
        format: {
          id: 0,
          formatItems: [
            {
              id: 0,
              name: "공급처명",
              type: "WholesalerName",
              ordinal: 0,
            },
            {
              id: 1,
              name: "공급처주소",
              type: "WholesalerAddress",
              ordinal: 1,
            },
          ],
        },
        status: 1,
      },
    ],
    building: [
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
    ],
    type: ["샘플", "사입", "기타"],
  };

  saveFilter(filter: Entity.Filter): Promise<void> {
    this.filter = filter;
    console.log("save", filter);
    return Promise.resolve();
  }

  getFilter(): Promise<Entity.Filter> {
    return Promise.resolve(this.filter);
  }

  deleteBuildings(deleteBuildingDisplayName: string): Promise<Entity.Filter> {
    let filter = this.filter;

    let buildingList = filter.building.slice();

    let addFlag = buildingList.map((building) => {
      building.isDeleted = false;
      return building;
    });

    // console.log(addFlag);

    const deletedRusult = addFlag.map((building) => {
      if (building.displayName === deleteBuildingDisplayName) {
        building.isDeleted = true;
        return building;
      } else {
        return building;
      }
    });

    console.log("deleted", deletedRusult);

    const result = deletedRusult.filter(
      (building) => building.isDeleted === false
    );

    filter.building = result;

    return Promise.resolve(filter);
  }

  deleteRetails(deleteRetailId: string): Promise<Entity.Filter> {
    let filter = this.filter;

    let retailList = filter.retail.slice();

    let addFlag = retailList.map((retail) => {
      retail.isDeleted = false;
      return retail;
    });

    // console.log(addFlag);

    const deletedRusult = addFlag.map((retail) => {
      if (retail.name === deleteRetailId) {
        retail.isDeleted = true;
        return retail;
      } else {
        return retail;
      }
    });

    console.log("deletedRetail", deletedRusult);

    const result = deletedRusult.filter((retail) => retail.isDeleted === false);

    filter.retail = result;
    return Promise.resolve(filter);
  }
}
