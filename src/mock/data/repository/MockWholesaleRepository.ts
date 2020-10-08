import { injectable } from "inversify";
import * as Entity from "../../../domain/entity";
import { WholesaleRepository } from "../../../domain/interactor/repository";

@injectable()
export default class MockWholesaleRepository implements WholesaleRepository {
  wholesales: Entity.Wholesale[] = [
    {
      id: "wsl000001",
      name: "테스트도매1",
      address: {
        id: 0,
        building: {
          id: "bld000000",
          displayName: "디오트",
          fullName: "디오트",
          simpleName: "디",
        },
        floor: "1F",
        detail: "E-001",
      },
      contacts: [
        {
          type: "order_number",
          content: "821086144283",
        },
      ],
    },
    {
      id: "wsl000002",
      name: "테스트도매2",
      address: {
        id: 0,
        building: {
          id: "bld000001",
          displayName: "청평화",
          fullName: "청평화",
          simpleName: "청",
        },
        floor: "2F",
        detail: "E-002",
      },
      contacts: [
        {
          type: "order_number",
          content: "821086144284",
        },
      ],
    },
    {
      id: "wsl000003",
      name: "테스트도매3",
      address: {
        id: 0,
        building: {
          id: "bld000001",
          displayName: "청평화",
          fullName: "청평화",
          simpleName: "청",
        },
        floor: "1F",
        detail: "E-001",
      },
      contacts: [
        {
          type: "order_number",
          content: "821086144285",
        },
      ],
    },
  ];

  getWholesalesByIds(ids: string[]): Promise<Entity.Wholesale[]> {
    var wholesales: Entity.Wholesale[] = [];

    const filteredIds = ids.filter(
      (id: string, idx, arr) => arr.indexOf(id) === idx
    );

    filteredIds.forEach((id: string) => {
      this.wholesales.forEach((wholesale: Entity.Wholesale) => {
        if (id === wholesale.id) {
          return wholesales.push(wholesale);
        }
      });
    });

    return Promise.resolve(wholesales);
  }

  getWTask(wholesaleId: string): Promise<Entity.Wholesale> {
    let wholesaleDetail: Entity.Wholesale = {};
    this.wholesales.forEach((wholesale: Entity.Wholesale) => {
      if (wholesale.id === wholesaleId) {
        wholesaleDetail = wholesale;
      }
    });
    return Promise.resolve(wholesaleDetail);
  }

  getWholesaleByTasks(wholesaleIds: string[]): Promise<Entity.Wholesale[]> {
    var wholesales: Entity.Wholesale[] = [];

    wholesaleIds.forEach((id: string) => {
      this.wholesales.forEach((wholesale: Entity.Wholesale) => {
        if (id === wholesale.id) {
          return wholesales.push(wholesale);
        }
      });
    });
    return Promise.resolve(wholesales);
  }
}
