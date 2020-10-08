import { injectable } from "inversify";
import * as Entity from "../../../domain/entity";
import { OrderRepository } from "../../../domain/interactor/repository";

@injectable()
export default class MockOrderRepository implements OrderRepository {
  getOrders(): Promise<Entity.Order[]> {
    return Promise.resolve([
      {
        id: "ord000001",
        retailerId: "rtl000001",
        date: "20200720",
        createdAt: null,
        createdBy: null,
        sent: null,
        sentAt: null,
        type: "IMPORTED",
      },
      {
        id: "ord000002",
        retailerId: "rtl000002",
        date: "20200720",
        createdAt: null,
        createdBy: null,
        sent: null,
        sentAt: null,
        type: "IMPORTED",
      },
    ]);
  }
}
