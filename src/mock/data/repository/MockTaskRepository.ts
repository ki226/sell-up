import { injectable } from "inversify";
import * as Entity from "../../../domain/entity";
import { TaskRepository } from "../../../domain/interactor/repository";

@injectable()
export default class MockTaskRepository implements TaskRepository {
  tasks: Entity.Task[] = [
    {
      index: "",
      id: "tsk000000",
      order: "ord000001",
      productCode: "제품의 도매 상품명",
      productName: "제품의 소매 상품명",
      productOption: "제품 옵션",
      productPrice: 9000,
      requestedComment: "요청사항입니다.",
      requestedQuantity: 1,
      retailer: "rtl000000",
      state: {
        checkOut: {
          id: 0,
          isCheckedOut: false,
        },
        comment: "",
        id: "tsk000000",
        quantity: 0,
        status: "WAITING",
        types: 0,
        prepaidQuantity: 0,
      },
      type: "기타",

      wholesaler: "wsl000001",
      isDeleted: false,
      wholesaleExpression: "",
    },
    {
      index: "",
      id: "tsk000001",
      order: "ord000001",
      productCode: "제품의 도매 상품명",
      productName: "제품의 소매 상품명",
      productOption: "제품 옵션",
      productPrice: 9000,
      requestedComment: "요청사항입니다.",
      requestedQuantity: 0,
      retailer: "rtl000000",
      state: {
        checkOut: {
          id: 0,
          isCheckedOut: false,
        },
        comment: "",
        id: "tsk000001",
        quantity: 0,
        status: "WAITING",
        types: 0,
        prepaidQuantity: 0,
      },
      type: "사입",
      wholesaler: "wsl000002",
      isDeleted: false,
      wholesaleExpression: "",
    },
    {
      index: "",
      id: "tsk000002",
      order: "ord000001",
      productCode: "제품의 도매 상품명",
      productName: "제품의 소매 상품명",
      productOption: "제품 옵션",
      productPrice: 9000,
      requestedComment: "요청사항입니다.",
      requestedQuantity: 5,

      retailer: "rtl000002",
      state: {
        checkOut: {
          id: 0,
          isCheckedOut: false,
        },
        comment: "",
        id: "tsk000002",
        quantity: 0,
        status: "WAITING",
        types: 0,
        prepaidQuantity: 3,
      },
      type: "사입",
      wholesaler: "wsl000003",

      isDeleted: false,
      wholesaleExpression: "",
    },
    {
      index: "",
      id: "tsk000003",
      order: "ord000001",
      productCode: "제품의 도매 상품명",
      productName: "제품의 소매 상품명",
      productOption: "제품 옵션",
      productPrice: 12000,
      requestedComment: "요청사항입니다.",
      requestedQuantity: 0,
      retailer: "rtl000001",
      state: {
        checkOut: {
          id: 0,
          isCheckedOut: false,
        },
        comment: "",
        id: "tsk000003",
        quantity: 0,
        status: "WAITING",
        types: 0,
        prepaidQuantity: 0,
      },
      type: "샘플",
      wholesaler: "wsl000002",
      isDeleted: false,
      wholesaleExpression: "",
    },
  ];

  getTasksByWholesaler(
    ids: string[],
    wholesaleId: string
  ): Promise<Entity.Task[]> {
    var tasksByRetail: Entity.Task[] = [];
    var tasksByWholesale: Entity.Task[] = [];

    ids.forEach((id) => {
      this.tasks.forEach((task) => {
        if (id === task.retailer) {
          tasksByRetail.push(task);
        }
      });
    });

    tasksByRetail.forEach((task: Entity.Task) => {
      if (wholesaleId === task.wholesaler) {
        tasksByWholesale.push(task);
      }
    });

    return Promise.resolve(tasksByWholesale);
  }

  getTasksByRetailer(
    retailIds: string[],
    wholesaleId: string
  ): Promise<Entity.Retailer[]> {
    let taskObj: any = {};

    retailIds.forEach((id: string) => {
      var tasks: Entity.Task[] = [];
      this.tasks.forEach((task: Entity.Task) => {
        if (id === task.retailer && wholesaleId === task.wholesaler) {
          tasks.push(task);
          taskObj[id] = tasks;
        }
      });
    });

    return Promise.resolve(taskObj);
  }

  getTasks(): Promise<Entity.Task[]> {
    return Promise.resolve(this.tasks);
  }

  getTotalPrice(tasks: {
    [key: string]: Entity.Task;
  }): Promise<{ [key: string]: number }> {
    return Promise.resolve(tasks);
  }

  getTaskDetail(taskId: string): Promise<Entity.Task> {
    let taskDetail: Entity.Task = {};
    this.tasks.forEach((task: Entity.Task) => {
      if (task.id === taskId) {
        taskDetail = task;
      }
    });
    return Promise.resolve(taskDetail);
  }

  getTasksByFilter(
    retailIds: string[],
    types: Entity.TaskType[]
  ): Promise<Entity.Task[]> {
    let taskObj: any = {};
    var tasks: Entity.Task[] = [];
    this.tasks.forEach((task: Entity.Task) => {
      retailIds.forEach((id: string) => {
        types.forEach((type) => {
          if (id === task.retailer && type === task.type) {
            tasks.push(task);
          }
        });
      });
    });

    const wholesaleIds = tasks.map((task) => task.wholesaler);
    wholesaleIds.forEach((id) => {
      let taskByWholesale: Entity.Task[] = [];
      tasks.forEach((task) => {
        if (task.wholesaler === id) {
          taskByWholesale.push(task);
          taskObj[id] = taskByWholesale;
        }
      });
    });

    return Promise.resolve(taskObj);
  }

  saveTaskInfo(
    // price: number,
    quantity: string,
    status: string,
    taskId: string,
    memo: string,
    prepaidQuantity: number
  ): Promise<void> {
    console.log("mock", status);
    this.tasks.forEach((task) => {
      if (taskId === task.id) {
        // task.productPrice = price;
        task.requestedQuantity = quantity;
        task.state.status = status;
        task.requestedComment = memo;
        task.state.prepaidQuantity = prepaidQuantity;
      }
    });
    console.log("task", this.tasks);
    return Promise.resolve();
  }
}
