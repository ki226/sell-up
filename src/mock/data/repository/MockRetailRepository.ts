import { injectable } from "inversify";
import * as Entity from "../../../domain/entity";
import { RetailRepository } from "../../../domain/interactor/repository";

@injectable()
export default class MockRetailRepository implements RetailRepository {
  retails: Entity.Retailer[] = [
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
        id: 1,
        formatItems: [
          {
            id: 3,
            name: "공급처명",
            type: "WholesalerName",
            ordinal: 0,
          },
          {
            id: 4,
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
        id: 1,
        formatItems: [
          {
            id: 3,
            name: "공급처명",
            type: "WholesalerName",
            ordinal: 0,
          },
          {
            id: 4,
            name: "공급처주소",
            type: "WholesalerAddress",
            ordinal: 1,
          },
        ],
      },
      status: 1,
    },
    {
      id: "rtl000003",
      name: "테스트3",
      format: {
        id: 1,
        formatItems: [
          {
            id: 3,
            name: "공급처명",
            type: "WholesalerName",
            ordinal: 0,
          },
          {
            id: 4,
            name: "공급처주소",
            type: "WholesalerAddress",
            ordinal: 1,
          },
        ],
      },
      status: 1,
    },
    {
      id: "rtl000004",
      name: "테스트4",
      format: {
        id: 1,
        formatItems: [
          {
            id: 3,
            name: "공급처명",
            type: "WholesalerName",
            ordinal: 0,
          },
          {
            id: 4,
            name: "공급처주소",
            type: "WholesalerAddress",
            ordinal: 1,
          },
        ],
      },
      status: 1,
    },
  ];

  getRetailsByIds(ids: string[]): Promise<Entity.Retailer[]> {
    var retails: Entity.Retailer[] = [];

    const filteredIds = ids.filter(
      (id: string, idx, arr) => arr.indexOf(id) === idx
    );
    filteredIds.forEach((id: string) => {
      this.retails.forEach((retail: Entity.Retailer) => {
        if (id === retail.id) {
          retails.push(retail);
        }
      });
    });

    return Promise.resolve(retails);
  }

  getRetailByTasks(retailIds: {
    [key: string]: string[];
  }): Promise<{ [key: string]: string[] }> {
    Object.keys(retailIds).forEach((wholesaleId: string) => {
      let retails: Entity.Retailer[] = [];

      const filteredId = retailIds[wholesaleId].filter(
        (id: string, idx: number, arr: string[]) => arr.indexOf(id) === idx
      );

      filteredId.forEach((id) => {
        this.retails.forEach((retail) => {
          if (id === retail.id) {
            retails.push(retail);
          }
        });
      });

      retailIds[wholesaleId] = retails;
    });

    return Promise.resolve(retailIds);
  }
}
