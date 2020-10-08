import { inject, injectable } from "inversify";
import * as Entity from "../../entity";
import { UCGetOrders } from "../index";
import { OrderRepository } from "../../interactor/repository";

@injectable()
export default class UCGetOrdersImpl implements UCGetOrders {
  private orderRepository: OrderRepository;

  constructor(@inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  execute(): Promise<Entity.Order[]> {
    return this.orderRepository.getOrders();
  }
}
