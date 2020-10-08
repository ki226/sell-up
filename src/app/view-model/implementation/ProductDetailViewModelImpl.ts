import { inject, injectable } from "inversify";
import { ProductDetailViewModel } from "..";
import { UCGetTaskDetail, UCSaveTaskInfo } from "../../../domain/use-case";
import { StateStatus, Task, TaskType, Week } from "../../../domain/entity";

@injectable()
export default class ProductDetailModelImpl implements ProductDetailViewModel {
  private ucGetTaskDetail: UCGetTaskDetail;
  private ucSaveTaskInfo: UCSaveTaskInfo;

  constructor(
    @inject("UCGetTaskDetail") ucGetTaskDetail: UCGetTaskDetail,
    @inject("UCSaveTaskInfo") ucSaveTaskInfo: UCSaveTaskInfo
  ) {
    this.ucGetTaskDetail = ucGetTaskDetail;
    this.ucSaveTaskInfo = ucSaveTaskInfo;
  }

  getStatus(task: Task): Promise<StateStatus[]> {
    let arr: StateStatus[] = [];
    if (task.type === TaskType.PICKUP) {
      arr.push(StateStatus.RECEIVING_SCHEDULED);
      arr.push(StateStatus.PREPAID);
      arr.push(StateStatus.SOLD_OUT);
      arr.push(StateStatus.SIZE_SOLD_OUT);
      arr.push(StateStatus.COLOR_WAY_SOLD_OUT);
      arr.push(StateStatus.NO_SINGLE_PIECE);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.EXCHANGE) {
      arr.push(StateStatus.EXCHANGE_COLOR);
      arr.push(StateStatus.EXCHANGE_DEFECTIVE);
      arr.push(StateStatus.EXCHANGE_SIZE);
      arr.push(StateStatus.EXCHANGE_PREPAID);
      arr.push(StateStatus.SOLD_OUT);
      arr.push(StateStatus.TAB);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.RETURN) {
      arr.push(StateStatus.DAILY_CREDIT);
      arr.push(StateStatus.IN_STORE_CREDIT);
      arr.push(StateStatus.TAB);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.SAMPLE_REQUEST) {
      arr.push(StateStatus.SAMPLE_PICKED_UP);
      arr.push(StateStatus.RECEIVING_SCHEDULED);
      arr.push(StateStatus.SOLD_OUT);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.SAMPLE_RETURN) {
      arr.push(StateStatus.SAMPLE_RETURNED);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.PREPAID) {
      arr.push(StateStatus.SOLD_OUT);
      arr.push(StateStatus.RECEIVING_SCHEDULED);
      arr.push(StateStatus.CUSTOM);
    } else if (task.type === TaskType.UNKNOWN) {
      arr.push(StateStatus.CUSTOM);
    }
    return Promise.resolve(arr);
  }

  getTaskDetail(taskId: string): Promise<Task> {
    return this.ucGetTaskDetail.execute(taskId);
  }

  saveTaskInfo(
    // price: number,
    quantity: string,
    status: string,
    taskId: string,
    memo: string,
    prepaidQuantity: number
  ): Promise<void> {
    return this.ucSaveTaskInfo.execute(
      // price,
      quantity,
      status,
      taskId,
      memo,
      prepaidQuantity
    );
  }

  getDate(): Promise<Week[]> {
    const date: number = new window.Date().getDate();
    let currentDay = new window.Date().getDay();
    let week: Week[] = Object.keys(Week)
      .filter((k) => typeof Week[k] !== "number")
      .map((k) => {
        return Week[k];
      });

    let twoWeeks: { [key: number]: string } = {};
    for (let i = 0; i < 14; i++) {
      if (currentDay > 6) {
        currentDay = 0;
        twoWeeks[date + i] = week[currentDay++];
      } else {
        twoWeeks[date + i] = week[currentDay++];
      }
    }
    return Promise.resolve(Object.entries(twoWeeks));
  }
}
