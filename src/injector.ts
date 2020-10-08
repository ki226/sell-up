import { Container } from "inversify";
import {
  SignUpViewModel,
  LogInViewModel,
  FilterViewModel,
  WTaskViewModel,
  ProductDetailViewModel,
  TaskListViewModel,
} from "./app/view-model";
import SignUpViewModelImpl from "./app/view-model/implementation/SignUpViewModelImpl";
import LogInViewModelImpl from "./app/view-model/implementation/LogInViewModelImpl";
import FilterViewModelImpl from "./app/view-model/implementation/FilterViewModelImpl";
import WTaskViewModelImpl from "./app/view-model/implementation/WTaskViewModelImpl";
import ProductDetailViewModelImpl from "./app/view-model/implementation/ProductDetailViewModelImpl";
import TaskListViewModelImpl from "./app/view-model/implementation/TaskListViewModelImpl";
import {
  CertResponseRepository,
  SignUpRepository,
  TaskRepository,
  RetailRepository,
  WholesaleRepository,
  BuildingRepository,
  TasksFilterRepository,
} from "./domain/interactor/repository";
import {
  UCGetCertResponse,
  UCCreateUser,
  UCMatchUser,
  UCGetTasks,
  UCGetRetails,
  UCGetWholesales,
  UCGetBuildings,
  UCSaveFilter,
  UCGetFilter,
  UCGetTasksByWholesaler,
  UCGetTasksByRetailer,
  UCGetTotalPrice,
  UCGetTaskDetail,
  UCGetWTask,
  UCSaveTaskInfo,
  UCGetTasksByFilter,
  UCGetWholesaleByTasks,
  UCGetRetailByTasks,
  UCGetBuildingsByWhole,
  UCDeleteBuildings,
  UCDeleteRetails,
} from "./domain/use-case";
import UCMatchUserImpl from "./domain/use-case/implementation/UCMatchUserImpl";
import UCCreateUserImpl from "./domain/use-case/implementation/UCCreateUserImpl";
import UCGetCertResponseImpl from "./domain/use-case/implementation/UCGetCertResponseImpl";
import UCGetTasksImpl from "./domain/use-case/implementation/UCGetTasksImpl";
import UCGetTasksByRetailerImpl from "./domain/use-case/implementation/UCGetTasksByRetailerImpl";
import UCGetTasksByWholesalerImpl from "./domain/use-case/implementation/UCGetTasksByWholesalerImpl";
import UCGetRetailsImpl from "./domain/use-case/implementation/UCGetRetailsImpl";
import UCGetWholesalesImpl from "./domain/use-case/implementation/UCGetWholesalesImpl";
import UCGetBuildingsImpl from "./domain/use-case/implementation/UCGetBuildingsImpl";
import UCSaveFilterImpl from "./domain/use-case/implementation/UCSaveFilterImpl";
import UCGetFilterImpl from "./domain/use-case/implementation/UCGetFilterImpl";
import UCGetTotalPriceImpl from "./domain/use-case/implementation/UCGetTotalPriceImpl";
import UCGetTaskDetailImpl from "./domain/use-case/implementation/UCGetTaskDetailImpl";
import UCGetTasksByFilterImpl from "./domain/use-case/implementation/UCGetTasksByFilterImpl";
import UCGetWTaskImpl from "./domain/use-case/implementation/UCGetWTaskImpl";
import UCSaveTaskInfoImpl from "./domain/use-case/implementation/UCSaveTaskInfoImpl";
import UCGetWholesaleByTasksImpl from "./domain/use-case/implementation/UCGetWholesaleByTasksImpl";
import UCGetRetailByTasksImpl from "./domain/use-case/implementation/UCGetRetailByTasksImpl";
import UCGetBuildingsByWholeImpl from "./domain/use-case/implementation/UCGetBuildingsByWholeImpl";
import UCDeleteBuildingsImpl from "./domain/use-case/implementation/UCDeleteBuildingsImpl";
import UCDeleteRetailsImpl from "./domain/use-case/implementation/UCDeleteRetailsImpl";
import MockSignUpRepository from "./mock/data/repository/MockSignUpRepository";
import MockCertResponseRepository from "./mock/data/repository/MockCertResponseRepository";
import MockTaskRepository from "./mock/data/repository/MockTaskRepository";
import MockRetailRepository from "./mock/data/repository/MockRetailRepository";
import MockWholesaleRepository from "./mock/data/repository/MockWholesaleRepository";
import MockBuildingRepository from "./mock/data/repository/MockBuildingRepository";
import MockTasksFilterRepository from "./mock/data/repository/MockTasksFilterRepository";

const container = new Container();
//container.bind<interface>("inject로쓸때 이걸로 확인해서 가져와쓴다/interface이름") .to<class>
container.bind<SignUpViewModel>("SignUpViewModel").to(SignUpViewModelImpl);
container.bind<LogInViewModel>("LogInViewModel").to(LogInViewModelImpl);
container.bind<FilterViewModel>("FilterViewModel").to(FilterViewModelImpl);
container.bind<WTaskViewModel>("WTaskViewModel").to(WTaskViewModelImpl);
container
  .bind<ProductDetailViewModel>("ProductDetailViewModel")
  .to(ProductDetailViewModelImpl);
container
  .bind<TaskListViewModel>("TaskListViewModel")
  .to(TaskListViewModelImpl);

container
  .bind<UCGetCertResponse>("UCGetCertResponse")
  .to(UCGetCertResponseImpl);
container.bind<UCCreateUser>("UCCreateUser").to(UCCreateUserImpl);
container.bind<UCMatchUser>("UCMatchUser").to(UCMatchUserImpl);
container.bind<UCGetTasks>("UCGetTasks").to(UCGetTasksImpl);
container
  .bind<UCGetTasksByWholesaler>("UCGetTasksByWholesaler")
  .to(UCGetTasksByWholesalerImpl);
container
  .bind<UCGetTasksByRetailer>("UCGetTasksByRetailer")
  .to(UCGetTasksByRetailerImpl);
container.bind<UCGetRetails>("UCGetRetails").to(UCGetRetailsImpl);
container.bind<UCGetWholesales>("UCGetWholesales").to(UCGetWholesalesImpl);
container.bind<UCGetBuildings>("UCGetBuildings").to(UCGetBuildingsImpl);
container.bind<UCSaveFilter>("UCSaveFilter").to(UCSaveFilterImpl);
container.bind<UCGetFilter>("UCGetFilter").to(UCGetFilterImpl);
container.bind<UCGetTotalPrice>("UCGetTotalPrice").to(UCGetTotalPriceImpl);
container.bind<UCGetTaskDetail>("UCGetTaskDetail").to(UCGetTaskDetailImpl);
container.bind<UCGetWTask>("UCGetWTask").to(UCGetWTaskImpl);
container.bind<UCSaveTaskInfo>("UCSaveTaskInfo").to(UCSaveTaskInfoImpl);
container
  .bind<UCGetTasksByFilter>("UCGetTasksByFilter")
  .to(UCGetTasksByFilterImpl);
container
  .bind<UCGetWholesaleByTasks>("UCGetWholesaleByTasks")
  .to(UCGetWholesaleByTasksImpl);
container
  .bind<UCGetRetailByTasks>("UCGetRetailByTasks")
  .to(UCGetRetailByTasksImpl);
container
  .bind<UCGetBuildingsByWhole>("UCGetBuildingsByWhole")
  .to(UCGetBuildingsByWholeImpl);
container
  .bind<UCDeleteBuildings>("UCDeleteBuildings")
  .to(UCDeleteBuildingsImpl);
container.bind<UCDeleteRetails>("UCDeleteRetails").to(UCDeleteRetailsImpl);

container
  .bind<CertResponseRepository>("CertResponseRepository")
  .to(MockCertResponseRepository);
container.bind<SignUpRepository>("SignUpRepository").to(MockSignUpRepository);
container.bind<TaskRepository>("TaskRepository").to(MockTaskRepository);
container.bind<RetailRepository>("RetailRepository").to(MockRetailRepository);
container
  .bind<WholesaleRepository>("WholesaleRepository")
  .to(MockWholesaleRepository);
container
  .bind<BuildingRepository>("BuildingRepository")
  .to(MockBuildingRepository);
container
  .bind<TasksFilterRepository>("TasksFilterRepository")
  .to(MockTasksFilterRepository);

export default container;
