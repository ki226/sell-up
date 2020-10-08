import { inject, injectable } from "inversify";
import { LogInViewModel } from "../index";
import { UCMatchUser } from "../../../domain/use-case";
import { User } from "../../../domain/entity";

@injectable()
export default class LogInViewModelImpl implements LogInViewModel {
  private ucMatchUser: UCMatchUser;

  constructor(@inject("UCMatchUser") ucMatchUser: UCMatchUser) {
    this.ucMatchUser = ucMatchUser;
  }

  matchUser(logInData: User): Promise<User> {
    return this.ucMatchUser.execute(logInData);
  }
}
