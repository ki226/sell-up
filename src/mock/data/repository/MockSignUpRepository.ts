import { SignUpRepository } from "../../../domain/interactor/repository";
import * as Entity from "../../../domain/entity";
import { injectable } from "inversify";

@injectable()
export default class MockSignUpRepository implements SignUpRepository {
  createUser(userData: Entity.User): Promise<Entity.User> {
    return Promise.resolve({
      //resolve >>then reject >> catch
      nameInput: "김사입",
      emailInput: "rlatkdlq@naver.com",
      passwordInput: "rlatkdlq!12",
    });
  }
  matchUser(logInData: Entity.User): Promise<Entity.User> {
    const email = "rlatkdlq@naver.com";
    const password = "rlatkdlq!12";

    return new Promise((resolve, reject) => {
      if (
        email === logInData.emailInput &&
        password === logInData.passwordInput
      )
        resolve({
          nameInput: "김사입",
          emailInput: "rlatkdlq@naver.com",
          passwordInput: "rlatkdlq!12",
        });
      else reject(new Error("error"));
    });
  }
}
